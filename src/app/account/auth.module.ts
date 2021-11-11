import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
//import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogOffComponent } from './log-off/log-off.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import {AuthService} from './auth.service';
import { JwtToken} from './jwt-token';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { UserProfileDeleteComponent } from './user-profile-delete/user-profile-delete.component';
import {AuthVar} from './authVar';


@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
       FormsModule,
       ReactiveFormsModule,
        HttpClientModule
    ],
    declarations: [
        SignInComponent,
        SignUpComponent,
        LogOffComponent,
        UserProfileComponent,
        UserProfileEditComponent,
        UserProfileDeleteComponent,

    ],
    providers:[
      JwtToken,
      AuthService,
      AuthVar


    ]
})
export class AuthModule {

}
