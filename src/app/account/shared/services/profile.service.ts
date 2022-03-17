import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/services/token.service';
import { AccoutServiceModule } from './accout-service.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouteApiService } from 'src/app/shared/services/route-api.service';
import { User } from '../../../shared/_interfaces/user.model';

@Injectable({
  providedIn: AccoutServiceModule
})
export class ProfileService {
  readonly _controller: string = 'Account';
  readonly _action = 'Profile';

  constructor(
    private http: HttpClient,
    private token: TokenService,
    private url: RouteApiService
  ) {
    url.Controller = this._controller;
    url.Action = this._action;
  }

  public Get(): Observable<User> {
    this.url.Controller=this._controller;
    this.url.Action = 'Profile';

    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.token.AccessToken,
    });

    return this.http.get<User>(this.url.Url, {
      headers
    }); //
  }

/*   public Create(user: User): Observable<any> {
    // throw new Error("Not implict");
    this.url.Action = 'Register';

    return this.http.post<any>(this.url.Url, user);
  } */
  public Update(user: User): Observable<any> {
    // throw new Error("Not implict");
    this.url.Action = 'Edit';
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.token.AccessToken,
    });
    return this.http.put(this.url.Url, user, { headers });
  }

  public Delete(id: string): Observable<any> {
    this.url.Action = 'delete';
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.token.AccessToken,
    });
    let url = this.url.Url + '/' + id;
    return this.http.delete(url, { headers });
  }
}
