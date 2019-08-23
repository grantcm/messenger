import { Component, OnInit, Input } from '@angular/core';
import { ConversationService } from '../../conversations/conversation.service';
import { MessageService } from '../../messages/message.service';
import { Conversation } from 'src/app/conversations/conversation';
import { User } from 'src/app/users/user';
import { UserDetails, AuthenticationService } from 'src/app/login/authentication.service';
import { UserId } from 'src/app/users/user-id';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {

  userDetails: UserDetails;
  selectedConversation: Conversation;
  selectedConversationParticipants: User[];

  constructor(private conversationService: ConversationService, private authenticationService: AuthenticationService) {
    this.selectedConversationParticipants = [];
   }

  ngOnInit() {
    this.userDetails = this.authenticationService.getUserDetails();
  }

  /**
   * Callback function for when a user is selected from the userlist. Gets the conversation object
   * and initializes the selected conversation and participant information.
   * @param user javascript object of a selected User
   */
  public userListUserSelected(user: any) {
    if(user._id === this.userDetails._id) return; // Can't start a conversation with yourself
    const userIds = [new UserId(user._id), new UserId(this.userDetails._id)];
    this.conversationService.getConversationWithUsersOrCreate(userIds)
      .subscribe((data: Conversation[]) => {
        if (data && data.length == 1) {
          this.selectedConversation = data[0];
        }
        this.selectedConversationParticipants = 
        [new User(new UserId(user._id), user.name, user.email, user.favoriteAnimal),
        new User(new UserId(this.userDetails._id), this.userDetails.name, this.userDetails.email, this.userDetails.favoriteAnimal)];
      });
  }

}
