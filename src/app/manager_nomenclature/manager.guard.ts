import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {UserManagerService} from 'src/app/_shared/services/user-manager.service'

@Injectable()
export class ManagerGuard implements CanActivate {

  private p:boolean=false;

  constructor (private _userManager : UserManagerService,private router : Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  | boolean {
      //debugger
     if( this._userManager.Exists)
     { if(this._userManager.IsAdmin||this._userManager.IsManager)
        return true;
        else{
          this.router.navigate(['/account']);
          return false;
        }
     }else{
        this.router.navigate(['/account']);
        return false;
      }



    }
  }
