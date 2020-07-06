import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import * as moment from 'moment';
import { distinctUntilChanged, skipWhile, takeWhile, filter, throttleTime, scan } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'angular-chat-app';
  message = 'Hi';
  messages = [];
  secretCode: string;
  endConversationCode: string;
  constructor(private chatService: ChatService) {
  }
  ngOnInit(): void {
    this.chatService
      .getMessages().pipe(distinctUntilChanged(), filter((message: string) => message.trim().length > 0),
        throttleTime(1000), scan((acc: string, message: string, index: number) =>
          `${message}(${index + 1})`
        ))
      .subscribe((message: string) => {
        const currentTime = moment().format('hh:mm:ss a');
        const messageWithTimestamp = `${currentTime}: ${message}`;
        this.messages.push(messageWithTimestamp);
      });
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
