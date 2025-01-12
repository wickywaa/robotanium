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
import { IBot, IBotCockpits, IBotMethods, IBotModel } from '../interfaces';
import { BotAuthService } from './authService';
import { OpenTokService } from './openTokServices'
import { IUserMethods, User, UserModel } from 'src/auth/interfaces';
var jwt = require('jsonwebtoken');


interface botAuth {
  type: 'bot',
  password: string,
  name: string,
  botId: string,
  camId: string
}

interface userAuth {
  type: 'user',
  token: string,
  id: string,
}

type connectedClient = userAuth | botAuth


interface IConnectedCockpit extends IBotCockpits {
  player: {
    id: string | null,
    name: string | null,
  }
  status: 'online' | 'offline' | 'occupied',  
}

interface IConnectedBot {
  id: string,
  name: string,
  cockpits: IConnectedCockpit[],
  socketId: string,
}

interface IConnectedUser {
  id: string,
  socketId: string,
  userName: string,
}

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  

 connectedBots: IConnectedBot[];
  connectedUsers: IConnectedUser[];
  constructor(
    @Inject('BOT_MODEL')
    private botModel: Model<IBot, IBotModel, IBotMethods>,
    @Inject('USER_MODEL')
    private userModel: Model<URIError,UserModel, IUserMethods>,
    private readonly botsService: BotAuthService,
    private readonly openTokService: OpenTokService
  ) {
    this.connectedBots = []
   }





  @WebSocketServer() io: Server;

  


  afterInit() {
    console.log('web sockets initiated first tie')
  }

  OnGatewayInit() {
    console.log('hello there')
  }

  updateBotList = async(bot: IBot, id:string) => {
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
      socketId: '12121',
    })

    console.log('connectedBots', this.connectedBots)
  }

  handleConnection = async(client ) => {


    client.on('test', (socket)=> {

      console.log('handling the connection here ', socket)
    } )

    console.log('connecting')


    const { sockets } = this.io.sockets;
    const authData: connectedClient = client.handshake.auth;
    const socketId =  client.conn.id

    

    if( authData.type === 'bot') {
      const bot = await this.botModel.findOne({_id:authData.botId});
      if(!bot) return client.disconnect();
      const passwordMatches = await this.botsService.passwordMatches(authData.password,bot.token)
      if(!passwordMatches) return client.disconnect();
      this.updateBotList(bot, bot._id.toString());    
    }

    if( authData.type === 'user') {

      var decoded = jwt.verify(authData.token, 'supersecretpassword');
      const {_id:id, iat} = decoded;


    // time is currently at 5 minutes needs to ba 24 hours
    if(new Date().getTime() - (iat * 1000)  >= 86400000 ) return ;
    const _id = mongoose.Types.ObjectId.createFromTime(parseInt(id));
    const user:User = await this.userModel.findOne({_id:id});

    if(!user) return client.disconnect();

    if(user.isRobotaniumAdmin) {
      
    }

    }

    return true


  }

  @SubscribeMessage('test')
  handleMessage(socket: Socket, data: any) {
    console.log('socket test',socket)
    console.log('data',data)
  }


  sendNewBotList = () => this.io.to('userRoom').emit('updatedBotList', this.connectedBots);
  sendNewUserList = () => this.io.to('userRoom').emit('updateUserList', this.connectedBots);


  handleDisconnect(client: any) {
    const socketId = client.conn.id as string
    this.connectedBots = this.connectedBots.filter((bot)=> bot.socketId !== socketId)


    //TODO send message to connected use to let them know bot was connected
  }

  // Example method to emit a message to a specific room

}
