import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogOffComponent } from './log-off/log-off.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { UserProfileDeleteComponent } from "./user-profile-delete/user-profile-delete.component";
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component'
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component'


const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'sing-up', component: SignUpComponent },
  { path: 'sing-off', component: LogOffComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'user-profile-edit', component: UserProfileEditComponent },
  { path: 'user-profile-delete', component: UserProfileDeleteComponent },
  { path: 'email-confirmation', component: EmailConfirmationComponent },
  { path: 'reset-password',component:ResetPasswordComponent},
  { path: 'forgot-password',component:ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
