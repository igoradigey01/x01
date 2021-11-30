import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './account-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
//import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogOffComponent } from './log-off/log-off.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import {AccoutServiceModule} from './shared/services/accout-service.module';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { UserProfileDeleteComponent } from './user-profile-delete/user-profile-delete.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';




@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
       FormsModule,
       ReactiveFormsModule,
        HttpClientModule,
        AccoutServiceModule
    ],
    declarations: [
        SignInComponent,
        SignUpComponent,
        LogOffComponent,
        UserProfileComponent,
        UserProfileEditComponent,
        UserProfileDeleteComponent,
        EmailConfirmationComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,

    ],
    providers:[

    ]
})
export class AuthModule {

}
