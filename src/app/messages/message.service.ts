import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { Message } from './message';
import { ConversationId } from '../conversations/conversation-id';
import { MessageSocketService } from './message-socket.service';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageAPIUrl = "/api/messages"
  private messageSocket: WebSocketSubject<Message>; 
  @Output() messageEmitter = new EventEmitter<Message>();
  constructor(private http: HttpClient, private messageSocketService: MessageSocketService) {
    this.messageSocket = this.messageSocketService.getMessageSocket();
    this.messageSocket.subscribe(
      (message) => this.pushNewMessageToServiceSubscribers(message),
      (err) => console.error(err),
      () => console.warn("Done.")
    );
  }

  getMessagesFromConversation(id: ConversationId) {
    const getParams = new HttpParams().set('id', id.toString());
    return this.http.get<Message[]>(`${this.messageAPIUrl}/conversation`, { params: getParams })
      .pipe(catchError(this.handleError));
  }

  pushNewMessageToServiceSubscribers(newMessage: Message) {
    this.messageEmitter.emit(newMessage);
  }

  createNewMessage(newMessage: Message) {
    this.messageSocket.next(newMessage);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
