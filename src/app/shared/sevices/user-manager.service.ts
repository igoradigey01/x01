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

  private _invalidLogin$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);



  constructor(
    private tokenService: TokenService
  ) { }
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

  private get Role() {
    if (!this.tokenService.Exists) {
      return false;
    }

    let dataJwt = this.tokenService.AccessToken?.split('.')[1];
    if (!dataJwt) {
      return false;
    }
    let decodeData = atob(dataJwt);
    let data = JSON.parse(decodeData);
    console.log('decodeData--' + decodeData);
    console.log('data--' + data.role);
    return data.role;
  }

  // private message$ = fromEvent<StorageEvent>(window, 'storage').pipe(
  //   filter((event) => event.storageArea === localStorage), // sessionStorage),
  //   filter((event) => event.key === 'access_token'), // name in token.service created
  //   map((event) => event.newValue)
  // );

  // ReplaySubject is more flexible than BehaviorSubject, as it
  // allows you to define how many past emissions should be available.
  // But you can get an equivalent code with BehaviorSubject by
  // coding like this:
  // private _coachProfile$: BehaviorSubject<any | null> =
  //    new BehaviorSubject<any | null>(null);
  //private _coachProfile$ : ReplaySubject<any > = new ReplaySubject<any>(1);
}
