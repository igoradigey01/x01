import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserManagerService } from 'src/app/shared/services/user-manager.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
//--------------------------
//not implements in header.module ,implemints in app.module
//----------------------
export class MenuComponent implements OnInit {

  private _subscriptions: Subscription[] = [];

  private _invalidLogin: boolean = true;
  private _isManager: boolean = false;
  private _isAdmin: boolean = false;
  private _isShopper: boolean = false;
  private _isOptovik:boolean=false;

  company_name_1: string = '';
  company_name_2: string = ''; //First Site



  constructor(
    private userManager: UserManagerService
  ) { }

  ngOnInit(): void {

    this.userManager.InvalidLogin$.subscribe(
      d => {
        this._invalidLogin = d;
        this._isAdmin = this.userManager.IsAdmin;
        this._isManager = this.userManager.IsManager;
        this._isShopper = this.userManager.IsShopper;
      }
    )

    this.userManager.FlagShopperOpt$.subscribe(
      d=>{
        this._isOptovik=this.userManager.IsShopperOpt;
      }
    )


  }

  ngOnDestroy() {
    this._subscriptions
      .forEach(s => s.unsubscribe());
  }
  public get InvalidLogin(): boolean {
    return this._invalidLogin;
    // throw new Error("not impliment exeption");
  }

  public get IsAdmin(): boolean {
  //  return true;
     if(this._isAdmin && !this._invalidLogin){
               return true;
     }
    return false;
  }
  public get IsManager(): boolean {
   // return true;
     if(this._isManager  && !this._invalidLogin){
               return true;
     }
    return false;
  }
  public get IsShopper(): boolean {
   // return true;
     if(this._isShopper && !this._invalidLogin){
               return true;
     }
    return false;
  }
  public get IsShopperOpt(): boolean {
    return this._isOptovik;
  }

}
