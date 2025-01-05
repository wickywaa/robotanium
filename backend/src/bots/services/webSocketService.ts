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
import { IBot, IBotMethods, IBotModel } from '../interfaces';
import { BotAuthService } from './authService';


interface botAuth {
  password: string,
  name: string,
  id: string,
}

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  

 readonly  connectedBots: IBot[];
  constructor(
    @Inject('BOT_MODEL')
    private botModel: Model<IBot, IBotModel, IBotMethods>,
    private readonly botsService : BotAuthService
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

  handleConnection = async(client: any, ...args: any[]) => {
    const { sockets } = this.io.sockets;

    const authData:botAuth = client.handshake.auth;

    const bot = await this.botModel.findOne({_id:authData.id});
    console.log(bot)

    console.log('connectedBots', this.connectedBots)
    if(!bot) return client.disconnect()



    console.log(`Client id: ${client.id} connected`);
    console.log(`Number of connected clients: ${sockets.size}`);
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