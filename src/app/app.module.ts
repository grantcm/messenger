import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { ConversationListComponent } from './conversations/conversation-list/conversation-list.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ConversationComponent } from './conversations/conversation/conversation.component';
import { ConversationInputComponent } from './conversations/conversation-input/conversation-input.component';
import { MessageViewComponent } from './messages/message-view/message-view.component';
import { LoginViewComponent } from './login/login-view/login-view.component';
import { SignInViewComponent } from './login/sign-in-view/sign-in-view.component';
import { RegisterViewComponent } from './login/register-view/register-view.component';
import { MessengerComponent } from './messenger/messenger/messenger.component';
import { WINDOW_PROVIDERS } from './window';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    ConversationListComponent,
    MessageListComponent,
    UserListComponent,
    ConversationComponent,
    ConversationInputComponent,
    MessageViewComponent,
    LoginViewComponent,
    SignInViewComponent,
    RegisterViewComponent,
    MessengerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
