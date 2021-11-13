import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  _flagButoon: boolean = false;
  _errorMgs: string[] = [];

  // parser file on load
  password: string='';
  email: string='';
  /** вход пользователья ;создание токена */
  constructor(

  //  private repozitoryDB: AuthService,
  //  private globalVar: GlobalVar,
    private router: Router,
  //  private jwtToken: JwtToken,
   // private tokenManager:TokenManagerService
  ) {}

  ngOnInit(): void {
   /*  this._form = this.formBuilder.group({
      email: '',
      password: '',
    });
    this.globalVal.userAuth = false;
    this.repozitoryDB
      .IsUserValid()
      .pipe(
        tap(() => {
          if (this.jwtToken.Exists()) {
            if (this.jwtToken.IsAdmin()) {
              this.globalVal.isAdimin = true;
            }
            this.globalVal.userAuth = true;
          }
        })
      )
      .subscribe(); */


  }

  submitForm(loginForm:NgForm) {
    // this._form.disable();
    this._errorMgs = [];

   // const credentials = JSON.stringify(form.value);

   /*  this.repozitoryDB.logIn(this._form.value).subscribe(
      (next) => {
        this.globalVal.userAuth = true;
        this._flagButoon = true;
        if (this.jwtToken.IsAdmin()) {
          this.globalVal.isAdimin = true;
        }
        this.router.navigateByUrl('');
      },
      (error: HttpErrorResponse) => {
        let body: string;
        if (error.status == 401) {
          this._flagButoon = false;
          this.globalVal.userAuth = false;
          body = 'Не верный логин или пароль';
        } else {
          body =
            'Ошибка соединения с сервером -Сообщиете Администаратору Pесурса';
        }
        this._errorMgs.push(body);
      }
    ); */

    // this.router.navigate(['/auth/sing-off']);
  }

  onFileInput(event:any) {
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
