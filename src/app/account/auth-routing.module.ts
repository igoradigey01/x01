import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import{LogOffComponent} from './log-off/log-off.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import{UserProfileDeleteComponent} from "./user-profile-delete/user-profile-delete.component";

const routes: Routes = [
    {path: '', component: SignInComponent},
    {path: 'sing-up', component: SignUpComponent},
    {path:'sing-off',component:LogOffComponent},
    {path:'user-profile', component: UserProfileComponent},
    {path:'user-profile-edit',component:UserProfileEditComponent},
    {path:'user-profile-delete',component:UserProfileDeleteComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {
}
