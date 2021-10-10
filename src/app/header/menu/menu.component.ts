import { Component, OnInit } from '@angular/core';
//import {GlobalVar} from '../../globalVar';


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
 //   private globlVar:GlobalVar
    ) {}

  ngOnInit(): void {
        }
  public getUsrAuht():boolean{
  //  return this.globlVar.userAuth;
  throw new Error("not impliment exeption");
  }

  public getUsrAdmin():boolean{
 //   return this.globlVar.isAdimin;
 throw new Error("not impliment exeption");

  }
}
