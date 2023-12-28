import { ArgumentsHost, WsExceptionFilter } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";

export class WebSocketExeptionFilter implements WsExceptionFilter {
    catch(exception: WsException, host: ArgumentsHost) {
        const socket = host.switchToWs().getClient()
        socket.emit('exeption', {
            status: 'error',
            message: 'WS message is invalid'
        })
    }
}