import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { ConversationListComponent } from './conversations/conversation-list/conversation-list.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ConversationComponent } from './conversations/conversation/conversation.component';
import { ConversationInputComponent } from './conversations/conversation-input/conversation-input.component';
import { MessageViewComponent } from './messages/message-view/message-view.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    ConversationListComponent,
    MessageListComponent,
    UserListComponent,
    ConversationComponent,
    ConversationInputComponent,
    MessageViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
