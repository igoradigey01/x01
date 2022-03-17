import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AccoutServiceModule } from './accout-service.module';

import { TokenService } from 'src/app/shared/services/token.service';
import { TokenModel } from 'src/app/shared/_interfaces/token-model';
import { RouteApiService } from 'src/app/shared/services/route-api.service';
import { RegistrationResponseDto } from '../_interfaces/registration-responseDto.model';
import { UserRegistrationDto } from '../_interfaces/user-registrationDto.model';
import { ForgotPasswordDto } from '../_interfaces/forgot-passwordDto.model';
import { UrlEncoder } from 'src/app/shared/_class/url-encoder.class';
import { ResetPasswordDto } from './../_interfaces/reset-passwordDto.model';

@Injectable({
  providedIn: AccoutServiceModule,
})
export class AccountService {
  readonly _controller: string = 'Account';
  readonly _action = 'Login';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private url: RouteApiService
  ) {

  }

  /** Get token login pass */
  public login = (credentials: string): Observable<any> => {

    this.url.Controller = this._controller;
    this.url.Action = this._action;

    //  console.log('login-credentials = '+credentials);
    return this.http
      .post(this.url.Url, credentials, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        tap(
          (res) => {
            let token = res as TokenModel;
            if (token) {
              this.tokenService.AccessToken = token.access_token;
              this.tokenService.RefreshToken = token.refresh_token;
            } else {
              console.log('error---  res as TokenModel = null');
            }
          },
          (error) => {
            console.log(error);
          }
        )
      );
  }

  public registerUser = (body: UserRegistrationDto) => {

    this.url.Controller = this._controller;
    this.url.Action = 'Registration';     //this._action;

    return this.http.post<RegistrationResponseDto>(this.url.Url, body);
  }

  public confirmEmail = (token: string, email: string) => {

    this.url.Controller = this._controller;
    this.url.Action = 'EmailConfirmation';            //this._action;

    let params = new HttpParams({ encoder: new UrlEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);

    return this.http.get(this.url.Url, { params: params });
  }

  public forgotPassword = (body: ForgotPasswordDto) => {
    this.url.Controller = this._controller;
    this.url.Action = 'ForgotPassword';

    return this.http.post(this.url.Url, body);
  }

  public resetPassword = (body: ResetPasswordDto) => {
    this.url.Controller = this._controller;
    this.url.Action = 'ResetPassword';

    return this.http.post(this.url.Url, body);
  }

  public isUserValid(token: string): Observable<any> {
    this.url.Controller = this._controller;
    this.url.Action = 'IsTokenValid';
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    });

    return this.http.get(this.url.Url, { headers });
  }
}
