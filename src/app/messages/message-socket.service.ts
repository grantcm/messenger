import { Injectable, Inject } from '@angular/core';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { Message } from './message';
import { WINDOW } from '../window';

@Injectable({
  providedIn: 'root'
})
export class MessageSocketService {
  private messageSocket: WebSocketSubject<Message>;

  constructor(@Inject(WINDOW) private window: Window) { 
    if(this.window.location.hostname === 'localhost') {
      //If local development, don't use SSL
      this.messageSocket = new WebSocketSubject(`ws://${this.window.location.hostname}:8080`);
    } else {
      this.messageSocket = new WebSocketSubject(`wss://${this.window.location.hostname}`);
    }
  }

  getMessageSocket() : WebSocketSubject<Message> {
    return this.messageSocket;
  }

  public next(message: Message) {
    this.messageSocket.next(message);
  }
}
