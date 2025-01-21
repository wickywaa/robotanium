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
    console.log('web sockets initiated first tie')
  }

  OnGatewayInit() {
    console.log('hello there')
  }

  updateBotList = async(bot: IBot, id:string, socketId) => {
    const isBotConnected = this.connectedBots.find((connectedBot)=> connectedBot.id = id)

    const cameras: IConnectedCockpit[] = await  Promise.all(
      bot.cameras.map(async()=>{
        return  {
          sessionId: await this.openTokService.createSessionID().then((session:any)=>session.sessionId),
          name: bot.name,
          player: {
            id:null,
            name: null,
          },
          status: "online"
        }
      })
    )

    this.connectedBots.push({
      id,
      name:bot.name,
      cockpits:cameras,
      socketId:socketId
    })

  

    console.log('cnnected Bots', this.connectedBots)

  }

  handleConnection = async(socket ) => {

    const authData: connectedClient = socket.handshake.auth;


    if(!authDTOIsValid(authData)) return socket.disconnect();

  
    if( authData.type === 'bot') {
      const bot = await this.botModel.findOne({_id:authData.botId});
      if(!bot) return socket.disconnect();
      if(!botAuthValid(bot,authData))return false;
      const passwordMatches = await this.botsService.passwordMatches(authData.password,bot.token)
      if(!passwordMatches) return socket.disconnect();
      await this.updateBotList(bot, bot._id.toString(), socket.id); 
      console.log('bot list', this.connectedBots.find((bot)=>{
        return bot.cockpits
      }))   

      this.broadCastConections(socket)
    }


    if( authData.type === 'user') {

    if(!userAuthValid(authData)) return socket.disconnect();



    const user:User = await this.userModel.findOne({_id:authData.id});

    if(!user) return socket.disconnect();

    if(user.isRobotaniumAdmin) {
      this.connectedAdminUsers.push({
        userName:user.userName,
        id: user._id,
        socketId:socket.id
      })
    }

    }

    return true
  }

  @SubscribeMessage('registerBot')
  handleMessage(socket: Socket, data: any) {
    console.log('socket test',socket.id)
    console.log('data',data)
  }

  @SubscribeMessage('connectUserToBot')
  handleconnectUserToBo(socket: Socket, data: {botId:string, cockpits:string[]}) {
    console.log('bot connected', socket.id)
    console.log('data',data)
    console.log('bots', this.connectedBots)
    const user = this.connectedUsers.find((user)=>user.socketId)
    const bot = this.connectedBots.find((bot)=> bot.id === data.botId)

    console.log('user', user)
    console.log('bot', bot)
    
  } 


  sendNewBotList = () => this.io.to('userRoom').emit('updatedBotList', this.connectedBots);
  sendNewUserList = () => this.io.to('userRoom').emit('updateUserList', this.connectedBots);


  handleDisconnect(client: any) {
    const socketId = client.conn.id as string
    this.connectedBots = this.connectedBots.filter((bot)=> bot.socketId !== socketId);
    this.connectedUsers = this.connectedUsers.filter((user) => user.socketId !== socketId);
    this.connectedAdminUsers = this.connectedAdminUsers.filter((user)=> user.socketId !== socketId) 

    this.broadCastConections(client)

    //TODO send message to connected use to let them know bot was connected
  }

  broadCastConections(socket:Socket) {
    console.log('broadcasting')
      socket.broadcast.emit('connections',{
      bots: this.connectedBots,
      admins: this.connectedBots,
      users: this.connectedUsers
    })
  }

  // Example method to emit a message to a specific room

}
