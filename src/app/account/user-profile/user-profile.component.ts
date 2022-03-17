import { Component, OnInit } from '@angular/core';

import { UserManagerService } from 'src/app/shared/services/user-manager.service';
import { ProfileService } from './../shared/services/profile.service';
import { User } from 'src/app/shared/_interfaces/user.model';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public _user: User = <User>{
    name: '',
    password: '',
    phone: '',
    address: '',
    email: '',
  };

  /**Вывод профиля пользователя (возможно его заказы???-не раализовано) */
  constructor(
    private profileServece: ProfileService,
    private userMangagerService: UserManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileServece.Get().subscribe(
      (data: User) => {
        this._user = data;

        //   console.log("getUserProfile() next:"+ data.name);
      },
      (error) => {
        console.log('getUserProfile() error:' + error);
      }
    );
  }

  onEditButton() {
    //throwError("Not implement exepthion");
    this.userMangagerService.user = this._user;
    //  console.log('test button user-profile');
    this.router.navigateByUrl('auth/user-profile-edit');
  }

  onDeleteButton() {
    throwError('Not implement exepthion');
    this.userMangagerService.user = this._user;
    //  console.log('test button user-profile');
    this.router.navigateByUrl('auth/user-profile-delete');
  }
}
