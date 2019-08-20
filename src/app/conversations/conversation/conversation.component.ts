import { Component, OnInit } from '@angular/core';
import { User } from '../../users/user';
import { ConversationService } from '../conversation.service';
import { Message } from 'src/app/messages/message';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  participants: User[];
  messages: Message[];

  constructor(private conversationService: ConversationService) { }

  ngOnInit() {
    //TODO create conversation service and initialize participants and messages
    this.messages = [new Message("Grant", "Hey, Veneta"), new Message("Veneta", "Zdravei, Kote!")];
    this.participants = [new User("Veneta", "Wolf/Dog"), new User("Grant", "Kotentse")];
  }

  public getConversationTitle = () : string => {
    return this.participants.map(participant => participant.name).join(", ");
  }

}
