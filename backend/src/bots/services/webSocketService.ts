import { Server } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() io: Server;

  afterInit() {
    console.log('web sockets initiated first tie')
  }

  OnGatewayInit() {
    console.log('hello there')
  }

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;

    console.log('this is the requested connection')

    console.log(`Client id: ${client.id} connected`);
    console.log(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
  }

  // Example method to emit a message to a specific room
  @SubscribeMessage("ping")
  handleMessage(client: any, data: any) {
    console.log(`Message received from client id: ${client.id}`);
    console.log(`Payload: ${data}`);
    return {
      event: "pong",
      data: "Wrong data that will make the test fail",
    };
  }
}