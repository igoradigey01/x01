import { Component, OnInit } from '@angular/core';
import {UserManagerService} from 'src/app/shared/sevices/user-manager.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
//--------------------------
//not implements in header.module ,implemints in app.module
//----------------------
 export class MenuComponent implements OnInit {

  company_name_1:string='';
  company_name_2:string=''; //First Site

  constructor(
    private userManager:UserManagerService
    ) {}

  ngOnInit(): void {
        }
  public get InvalidLogin():boolean{
    return   this.userManager.invalidLogin;
 // throw new Error("not impliment exeption");
  }

  public getUsrAdmin():boolean{
 //   return this.userManager.isAdimin;
 throw new Error("not impliment exeption");

  }
}
