import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_interfaces/user.model';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class UserManagerService {
  //_invalidLogin|| userAuth: boolean = false; // авторизован ли пользователь ? иконка входа цвет
  user?: User | null = null; // передача данных на сервер в параметрах // edit-profile,profile
  private isAdmin: boolean = false; // является ли пользователь админ,для перехода в админ модуль
  private isManager: boolean = false; // 03.10.21
  private isShopper: boolean = false; // role -покупатель(клиент)
  // private isShopperOpt:boolean=false; // оптовый покупатель(реализатор?)

  private readonly _var_opt_shopper: string = 'opt_var';

  private _invalidLogin$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  private _flagOptVar$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private _tokenService: TokenService) {}

  /** Client subscribe() for var_opt_shopper chenged; !! ngOnDestroy()-- unsubscribe !!  */
  public get FlagShopperOpt$(): BehaviorSubject<boolean> {
    return this._flagOptVar$;
  }
  /** set value for   var_opt_shopper ; defauld -- false */
  public setFlagShopperOpt$(i: boolean) {
    this._flagOptVar$.next(i);
  }

  public setVarShopperOpt(){
    localStorage.setItem(this._var_opt_shopper,'opt-1');

  }

  public clearVarShopperOpt(): void {
    localStorage.removeItem(this._var_opt_shopper);
  }

  /** Client subscribe() for _invalidLogin chenged; !! ngOnDestroy()-- unsubscribe !!  */
  public get InvalidLogin$(): BehaviorSubject<boolean> {
    return this._invalidLogin$;
  }
  /** set value for  _invalidLogin ; defauld -- true */
  public setInvalidLogin$(i: boolean) {
    this._invalidLogin$.next(i);
  }

  public get IsAdmin(): boolean {
    if (this.Role === 'admin') {
      return true;
    }
    return false;
  }

  public get IsManager(): boolean {
    // throw new Error("not impliment exeption");

    if (this.Role === 'manager') {
      return true;
    }
    return false;
  }

  public get IsShopper(): boolean {
    if (this.Role === 'shopper') {
      return true;
    }
    return false;
  }
   /** это реализатор */
   public get IsShopperOpt(): boolean {
    let opt_var = localStorage.getItem(this._var_opt_shopper);

     //debugger
    if (opt_var && opt_var === 'opt-1') {
      return true;
    }
    return false;
  }
  /** token существует && срок действия токена истек ?  */
  public get Exists(): boolean {
    return this._tokenService.Exists;
  }





  private get Role() {
    return this._tokenService.Role;
  }
}
