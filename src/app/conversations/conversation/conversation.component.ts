import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../users/user';
import { ConversationService } from '../conversation.service';
import { Message } from 'src/app/messages/message';
import { ConversationId } from '../conversation-id';
import { MessageService } from 'src/app/messages/message.service';
import { Conversation } from '../conversation';
import { UserDetails } from 'src/app/login/authentication.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  private _conversation: Conversation;
  @Input() userDetails: UserDetails;
  @Input() participants: User[];
  messages: Message[];

  constructor(private messageService: MessageService) {
    this.messages = [];
    this.participants = [];
  }

  ngOnInit() {
    this.initializeConversationMessages();
    this.messageService.messageEmitter.subscribe(next => this.handleIncomingMessage(next), complete => this.messageService.messageEmitter.unsubscribe());
  }

  private handleIncomingMessage(message: Message) {
    if(message.conversationId === this._conversation._id) {
      this.messages.push(message);
    } else {
      //Display notification to over user icon
    }
  }

  get conversation() {
    return this._conversation;
  }

  @Input()
  set conversation(conversation: Conversation) {
    this._conversation = conversation;
    this.messages = [];
    this.initializeConversationMessages();
  }

  private initializeConversationMessages() {
    if (this._conversation) {
      this.messageService.getMessagesFromConversation(this._conversation._id)
        .subscribe((data: Message[]) => { this.messages = data });
    }
  }

  public getConversationTitle = (): string => {
    return this.participants.map(participant => participant.name.split(" ")[0]).join(", ");
  }
}
