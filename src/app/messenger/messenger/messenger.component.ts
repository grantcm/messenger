import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ConversationService } from '../../conversations/conversation.service';
import { Conversation } from 'src/app/conversations/conversation';
import { User } from 'src/app/users/user';
import { UserDetails, AuthenticationService } from 'src/app/login/authentication.service';
import { UserId } from 'src/app/users/user-id';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit, OnDestroy {
  navigationSubscription: Subscription;
  userDetails: UserDetails;
  selectedConversation: Conversation;
  selectedConversationParticipants: User[];


  constructor(private conversationService: ConversationService, private authenticationService: AuthenticationService, private router: Router) {
    this.selectedConversationParticipants = [];
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationStart) {
        //do nothing
        console.log(e);
      }
    })
   }

  ngOnInit() {
    this.userDetails = this.authenticationService.getUserDetails();
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
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
        //TODO get this data from the backend
        this.selectedConversationParticipants = 
        [new User(new UserId(user._id), user.name, user.email, user.favoriteAnimal),
        new User(new UserId(this.userDetails._id), this.userDetails.name, this.userDetails.email, this.userDetails.favoriteAnimal)];
      });
  }

}
