import { Logger } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({})
export class WsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger('MessageGateway');

    @WebSocketServer() ws: Server;

    afterInit(server: Server) {
        this.logger.log('Initialized');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client Disconnected: ${client.id}`);
    }
    
    handleConsolelog(){
      console.log('wewewewe')
    }

    async handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client Connected: ${client}`);
    }

    @SubscribeMessage('sendMessage')
    async handleSendMessage(client: Socket, payload: string): Promise<void> {
        this.ws.emit('tes', payload)
    }
}