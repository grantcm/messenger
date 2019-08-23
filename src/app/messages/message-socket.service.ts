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
    this.messageSocket = new WebSocketSubject(`ws://${this.window.location.hostname}`);
  }

  getMessageSocket() : WebSocketSubject<Message> {
    return this.messageSocket;
  }

  public next(message: Message) {
    this.messageSocket.next(message);
  }
}
