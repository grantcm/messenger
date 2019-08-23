import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessengerComponent } from './messenger/messenger/messenger.component';
import { SignInViewComponent } from './login/sign-in-view/sign-in-view.component';


const routes: Routes = [
  {path: 'messenger', component: MessengerComponent},
  {path: '', component: SignInViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
