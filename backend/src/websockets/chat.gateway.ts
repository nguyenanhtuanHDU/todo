import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { ChatSocket } from "./chat";
import { UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { WebSocketExeptionFilter } from "./exeption";
import { Socket } from 'socket.io'

const options = {
    cors: {
        origin: "*",
        credentials: true
    }
}

@WebSocketGateway(options)
export class ChatGateway {
    @SubscribeMessage('events')
    @UsePipes(new ValidationPipe())
    @UseFilters(new WebSocketExeptionFilter())
    handleEvent(@MessageBody() data: ChatSocket, @ConnectedSocket() client: Socket): ChatSocket {
        client.broadcast.emit('events', {
            ...data,
        })
        return data;
    }
}