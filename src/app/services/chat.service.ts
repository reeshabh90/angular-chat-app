import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:3000';
  private socket;
  constructor() {
    this.socket = io(this.url);
  }

  sendMessage(message: any): void {
    this.socket.emit('new-message', message);
  }

  getMessages = () => {
    return new Observable((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  }
}
