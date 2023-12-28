import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketService } from 'src/app/services/socket.service';
import { IChat } from 'src/app/shared/models/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  username = this.socketService.getUser()
  message: string = ''
  constructor(
    private socketService: SocketService,
  ) {
  }

  messages = this.socketService.chat

  ngOnInit(): void {
    this.socketService.connectToServer()
    this.socketService.getMessage()
  }

  send() {
    if (this.message) {
      this.socketService.sendMessage(this.message)
    }
  }
}
