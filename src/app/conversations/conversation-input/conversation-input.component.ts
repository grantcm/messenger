import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'src/app/messages/message.service';
import { Message } from 'src/app/messages/message';
import { UserId } from 'src/app/users/user-id';
import { ConversationId } from '../conversation-id';
import { AuthenticationService, UserDetails } from 'src/app/login/authentication.service';

@Component({
  selector: 'app-conversation-input',
  templateUrl: './conversation-input.component.html',
  styleUrls: ['./conversation-input.component.css']
})
export class ConversationInputComponent implements OnInit {
  private _conversationId: ConversationId;
  userDetails: UserDetails;
  payload: string = '';
  form: FormGroup;

  constructor(private messageService: MessageService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.form = new FormGroup({ messageText: new FormControl('') });
    this.userDetails = this.authenticationService.getUserDetails();
  }

  @Input()
  set conversationId(conversationId: ConversationId) {
    this._conversationId = conversationId;
  }

  onSubmit() {
    const message = new Message(new UserId(this.userDetails._id), this.userDetails.name, this._conversationId, this.form.value.messageText);
    this.form.reset({ messageText: '' });
    this.messageService.createNewMessage(message);
  }



}
