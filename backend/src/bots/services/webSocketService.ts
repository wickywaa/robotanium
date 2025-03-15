import { Server, Socket } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Inject, UseGuards } from '@nestjs/common';
import {AuthGuard} from '../guards/AuthGuards'
import mongoose, { Model } from 'mongoose';
import { IBot, IBotCockpits, IBotMethods, IBotModel, botAuth, userAuth,IConnectedBot, IConnectedUser,IConnectedCockpit, connectedClient  } from '../interfaces';
import { BotAuthService } from './authService';
import { OpenTokService } from './openTokServices'
import { IUserMethods, User, UserModel } from 'src/auth/interfaces';
import { authDTOIsValid, botAuthValid, userAuthValid } from '../validators/socket.validator';
var jwt = require('jsonwebtoken');


@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  

 connectedBots: IConnectedBot[];
  connectedUsers: IConnectedUser[];
  connectedAdminUsers: IConnectedUser[];
  constructor(
    @Inject('BOT_MODEL')
    private botModel: Model<IBot, IBotModel, IBotMethods>,
    @Inject('USER_MODEL')
    private userModel: Model<User,UserModel, IUserMethods>,
    private readonly botsService: BotAuthService,
    private readonly openTokService: OpenTokService
  ) {
    this.connectedBots = []
    this.connectedUsers = []
    this.connectedAdminUsers = []
   }


  @WebSocketServer() io: Server;

  


  afterInit() {
    console.log('web sockets initiated first time')
  }

  OnGatewayInit() {
    console.log('hello there')
  }

  updateBotList = async(bot: IBot, id:string, socketId) => {
    const isBotConnected = this.connectedBots.find((connectedBot)=> connectedBot._id = id)

    console.log('connectingbot', bot)

    const cameras: IConnectedCockpit[] = await  Promise.all(
      bot.cameras.map(async(camera)=>{
        return  {
          _id: camera._id,
          sessionId: await this.openTokService.createSessionID().then((session:any)=>session.sessionId),
          accessToken: '',
          name: bot.name,
          player: {
            id:null,
            name: null,
          },
          status: "online"
        }
      })
    )

   this.connectedBots =  this.connectedBots.filter((bot)=>bot._id !== id).concat({
      _id:id,
      name:bot.name,
      cockpits:cameras,
      socketId:socketId,
      adminId: ''
    })

  

    console.log('connected Bots', this.connectedBots)

  }

  handleConnection = async(socket ) => {

    const authData: connectedClient = socket.handshake.auth;


    if(!authDTOIsValid(authData)) return socket.disconnect();

  
    if( authData.type === 'bot') {
      console.log('bot auth data', authData)
      const bot = await this.botModel.findOne({_id:authData.botId});
      if(!bot) return socket.disconnect();
      if(!botAuthValid(bot,authData))return false;
      const passwordMatches = await this.botsService.passwordMatches(authData.password,bot.token)
      if(!passwordMatches) return socket.disconnect();
      await this.updateBotList(bot, bot._id.toString(), socket.id); 
      console.log('bot list', this.connectedBots.find((bot)=>{
        return bot.cockpits
      }))   

      this.emitAllConnections(socket)
    }


    if( authData.type === 'user') {

    if(!userAuthValid(authData)) return socket.disconnect();

    const user:User = await this.userModel.findOne({_id:authData.id});

    if(!user) return socket.disconnect();
    const connectedUser = {
      userName:user.userName,
      id: user._id.toString(),
      socketId:socket.id
    }

    if(user.isRobotaniumAdmin) {
      console.log('socket', socket.id)
      console.log('list1,',this.connectedAdminUsers)
      this.addToAdminUserArray(connectedUser);

      console.log('admin usr list ', this.connectedAdminUsers)
      this.emitAllConnections(socket)
      return
    }

    this.addToUserArray(connectedUser)
    this.emitAllConnections(socket)


    }

    return true
  }

  @SubscribeMessage('registerBot')
  handleMessage(socket: Socket, data: any) {
    
  }

  @SubscribeMessage('connectUserToBot')
  handleconnectUserToBo(socket: Socket, data: {botId:string, cockpits:string[]}) {

    const user = this.connectedUsers.find((user)=>user.socketId)
    const bot = this.connectedBots.find((bot)=> bot._id === data.botId)


  } 

  addToAdminUserArray = (adminUser:IConnectedUser) =>
   this.connectedAdminUsers =  this.connectedAdminUsers.filter((user)=>adminUser.id !== user.id).concat(adminUser)

  addToUserArray = (connectedUser:IConnectedUser ) =>  
    this.connectedUsers = this.connectedUsers.filter((user)=>user.id !== connectedUser.id).concat(connectedUser)


  sendNewBotList = () => this.io.to('userRoom').emit('updatedBotList', this.connectedBots);
  sendNewUserList = () => this.io.to('userRoom').emit('updateUserList', this.connectedBots);


  handleDisconnect(socket: any) {
  

    const socketId = socket.id as string
    this.connectedBots = this.connectedBots.filter((bot)=> bot.socketId !== socketId);
    this.connectedUsers = this.connectedUsers.filter((user) => user.socketId !== socketId);
    this.connectedAdminUsers = this.connectedAdminUsers.filter((user)=> user.socketId !== socketId) 

    this.emitAllConnections(socket)

    //TODO send message to connected use to let them know bot was connected
  }

  emitAllConnections(socket:Socket) {
    console.log('broadcasting',{
      bots: this.connectedBots,
      admins: this.connectedAdminUsers,
      users: this.connectedUsers
    })

      this.io.emit('connections',{
      bots: this.connectedBots,
      admins: this.connectedAdminUsers,
      users: this.connectedUsers
    })
  }

  // Example method to emit a message to a specific room

}
