import { Component, ViewChild } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @ViewChild('scroll') scroll!: NgScrollbar
  username = this.socketService.getUser()
  message: string = ''
  constructor(
    private socketService: SocketService,
  ) {
  }

  newMessageSubscription!: Subscription;


  messages = this.socketService.chat

  ngOnInit(): void {
    this.socketService.connectToServer()
    this.socketService.getMessage()
    this.newMessageSubscription = this.socketService.newMessage$.subscribe(() => {
      this.scrollToBottom();
    });
  }

  ngOnDestroy(): void {
    this.newMessageSubscription.unsubscribe();
  }

  clear() {
    this.message = ''
  }

  send() {
    if (this.message) {
      this.socketService.sendMessage(this.message)
      this.scrollToBottom()
      this.clear()
    }
  }

  scrollToBottom() {
    this.scroll?.scrollTo({ bottom: -30 })
  }
}
