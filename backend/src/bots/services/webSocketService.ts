import { Server } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Inject, UseGuards } from '@nestjs/common';
import {AuthGuard} from '../guards/AuthGuards'
import { Model } from 'mongoose';
import { IBot, IBotCockpits, IBotMethods, IBotModel } from '../interfaces';
import { BotAuthService } from './authService';
import { OpenTokService } from './openTokServices';


interface botAuth {
  password: string,
  name: string,
  botId: string,
  camId: string
}

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
  cockpits: IConnectedCockpit[]
}

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  

 readonly  connectedBots: IConnectedBot[];
  constructor(
    @Inject('BOT_MODEL')
    private botModel: Model<IBot, IBotModel, IBotMethods>,
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
      cockpits:cameras
    })

    console.log('connectedBots', this.connectedBots[0].cockpits)
  }

  handleConnection = async(client: any, ...args: any[]) => {
    const { sockets } = this.io.sockets;

    const authData:botAuth = client.handshake.auth;

    console.log('authData', authData)

    const bot = await this.botModel.findOne({_id:authData.botId});
    console.log(bot)

    console.log('connectedBots', this.connectedBots)
    if(!bot) return client.disconnect();
    const passwordMatches = await this.botsService.passwordMatches(authData.password,bot.token)

    console.log('passwordMatch', passwordMatches)
    if(!passwordMatches) return client.disconnect();


    console.log(`Client id: ${client.id} connected`);
    console.log(`Number of connected clients: ${sockets.size}`);
    this.updateBotList(bot, bot._id.toString())
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
  }

  // Example method to emit a message to a specific room
  @UseGuards(AuthGuard)
  @SubscribeMessage("login")
  handleMessage(client: any, data: any) {
    console.log(`Message received from client id: ${client.id}`);
    console.log(`Payload: ${data}`);
    return {
      event: "pong",
      data: "Wrong data that will make the test fail",
    };
  }
}