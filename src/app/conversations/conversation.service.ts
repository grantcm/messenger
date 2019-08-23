import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConversationId } from './conversation-id';
import { Conversation } from './conversation';
import { UserId } from '../users/user-id';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ConversationService {
  private conversationAPIUrl = "api/conversations";
  constructor(private http: HttpClient) { }

  getConversation(id: ConversationId) {
    const getParams = new HttpParams().set('id', id.toString());
    return this.http.get<Conversation>(`${this.conversationAPIUrl}`, { params: getParams })
      .pipe(catchError(this.handleError));
  }

  getConversationWithUser(id: UserId) {
    const getParams = new HttpParams().set('id', id.toString());
    return this.http.get<Conversation>(`${this.conversationAPIUrl}/participant`, { params: getParams })
    .pipe(catchError(this.handleError));
  }

  getConversationWithUsersOrCreate(ids: UserId[]) {
    const getParams = new HttpParams().set('ids', JSON.stringify(ids));
    return this.http.get<Conversation[]>(`${this.conversationAPIUrl}/participants`, { params: getParams })
    .pipe(catchError(this.handleError));
  }

  addConversation(participants: UserId[]) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'my-auth-token'
      })
    };
    const conversation = new Conversation(participants);
    return this.http.post<Conversation>(this.conversationAPIUrl, conversation, httpOptions)
      .pipe(catchError(this.handleError));
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
