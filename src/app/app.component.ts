import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from "./login/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'messenger';
  userDetails: UserDetails;
  constructor(public auth: AuthenticationService) {

  }
}
