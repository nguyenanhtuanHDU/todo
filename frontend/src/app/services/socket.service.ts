import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { IChat } from '../shared/models/chat.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  chatSubject = new BehaviorSubject<IChat[]>([])
  chat = this.chatSubject.asObservable().pipe(distinctUntilChanged())

  constructor(
    private socket: Socket,
    private CookieService: CookieService,
  ) { }

  setUser(username: string) {
    this.CookieService.set('username', username)
  }

  getUser() {
    return this.CookieService.get('username')
  }

  connectToServer() {
    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });
  }

  sendMessage(message: string) {
    this.chatSubject.next([...this.chatSubject.getValue(), {
      username: this.getUser(),
      message,
      time: new Date().toDateString()
    }])
    this.socket.emit('events', {
      username: this.getUser(),
      message
    });
  }

  getMessage() {
    this.socket.on('events', (data: IChat) => {
      console.log("🚀 ~ data:", data)
      this.chatSubject.next([...this.chatSubject.getValue(), data])
      console.log("🚀 ~ this.chatSubject.getValue():", this.chatSubject.getValue())
    });
  }
}
