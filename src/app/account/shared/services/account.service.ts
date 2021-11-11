import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AccoutServiceModule } from './accout-service.module';
import { TokenService } from 'src/app/shared/sevices/token.service';
import { TokenModel } from 'src/app/shared/_interfaces/token-model';
import { RouteApiService } from 'src/app/shared/sevices/route-api.service';

@Injectable({
  providedIn: AccoutServiceModule,
})
export class AccountService {
  readonly _controller: string = 'Account';
  readonly _action = 'Login';

  constructor(
    private http: HttpClient,
    private token: TokenService,
    private url: RouteApiService
  ) {
    url.Controller = this._controller;
    url.Action = this._action;
  }
  /** Get token login pass */
  public login(credentials: JSON): Observable<any> {
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
              this.token.AccessToken = token.access_token;
              this.token.RefreshToken = token.refresh_token;
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

  IsUserValid(): Observable<any> {
    this.url.Action = 'IsTokenValid';
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.token.AccessToken,
    });

    return this.http.get(this.url.Url, { headers });
  }
}
