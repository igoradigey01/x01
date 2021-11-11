import { Component, OnInit } from '@angular/core';
import { AuthService} from './../auth.service'
import { User } from './../../data-model/class-data.model';
import { GlobalVar} from '../../globalVar';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
 private   _authServece:AuthService;
 public _user:User={name:'',password:'',phone:'',address:'',email:''} ;

/**Вывод профиля пользователя (возможно его заказы???-не раализовано) */
  constructor(
    private authServece:AuthService,
    private globalVal:GlobalVar,
    private router: Router

    ) {
    this._authServece=authServece;
   }

  ngOnInit(): void {
    this._authServece.getUserProfile().subscribe(

      (data:User)=>{this._user=data;

     //   console.log("getUserProfile() next:"+ data.name);
    },
      (error)=>{
        console.log("getUserProfile() error:"+error);
    }
      );



  }

  onEditButton(){
    //throwError("Not implement exepthion");
  this.globalVal.userSerialize=this._user;
//  console.log('test button user-profile');
 this.router.navigateByUrl('auth/user-profile-edit');

  }

  onDeleteButton(){
    throwError("Not implement exepthion");
    this.globalVal.userSerialize=this._user;
//  console.log('test button user-profile');
 this.router.navigateByUrl('auth/user-profile-delete');

  }

}
