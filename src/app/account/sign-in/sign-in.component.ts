import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { UserManagerService } from 'src/app/shared/sevices/user-manager.service';
import { AccountService } from './../shared/services/account.service';
import { User } from 'src/app/shared/_interfaces/user.model';
import { TokenService } from 'src/app/shared/sevices/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  private _subscriptions: Subscription[] = [];

  _flagButoon: boolean = false;
  _errorMgs: string[] = [];

  // parser file on load
  password: string = '';
  email: string = '';
  rememberme: boolean = false;
  /** вход пользователья ;создание токена */
  constructor(
    private accountServie: AccountService,
    private userManagerService: UserManagerService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    let subLogin = this.userManagerService.InvalidLogin$.subscribe();
    if (this.tokenService.Exists) {
      this.accountServie
        .isUserValid(this.tokenService.AccessToken || '')

        .subscribe(() => {
          this.userManagerService.setInvalidLogin$(false);
        });
    }
    this._subscriptions.push(subLogin);
  }

  ngOnDestroy() {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }

  submitForm(loginForm: NgForm) {
    // this._form.disable();
    this._errorMgs = [];

    const credentials = JSON.stringify(loginForm.value);
    // this._errorMgs.length=0;

    this.accountServie.login(credentials).subscribe(
      (next) => {
        this.userManagerService.setInvalidLogin$(false);
        this._flagButoon = true;
        /* if (this.tokenService.IsAdmin()) {
          this.userManagerService.isAdimin = true;
        } */
        this.router.navigateByUrl('');
      },
      (error: HttpErrorResponse) => {
        let body: string;
        this.userManagerService.setInvalidLogin$(true);
        this._flagButoon = false;
        if (error.status === 401||error.status == 400) {
          //this.userManagerService.invalidLogin = true;
       //  console.log(  error.message);
         this._errorMgs.push( error.error);

          return;

          //  body = 'Не верный логин или пароль';
        }
      

        body =
          'Ошибка соединения с сервером -Сообщиете Администаратору Pесурса';

        this._errorMgs.push(body);
      }
    );

    // this.router.navigate(['/auth/sing-off']);
  }

  onUserChenged() {
    console.log('userManager.IsAdmin--' + this.userManagerService.IsAdmin);
  }

  onFileInput(event: any) {
    let data = event.target.files[0];

    let fr = new FileReader();
    fr.readAsText(data);
    fr.onload = () => {
      console.log('Input-file cheng ok------' + fr.result);
      let coolVar = fr.result as string;

      var partsArray = coolVar.split(';');
      this.email = partsArray[0].trim();
      this.password = partsArray[1].trim();

      /*  console.log(this._log+"----log----");
      console.log(this._pass+"---pas--"); */
    };
    fr.onerror = function () {
      console.log(fr.error);
    };
  }
}
