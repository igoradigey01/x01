import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ManagerServiceModule } from './maneger-service.module';
import { Katalog } from 'src/app/shared/_interfaces/katalog.model';
import { Observable } from 'rxjs';
import {TokenService} from 'src/app/shared/sevices/token.service';
import { RouteApiService } from 'src/app/shared/sevices/route-api.service';

@Injectable({
  providedIn: ManagerServiceModule
})
export class KatalogService {
  readonly controller: string = 'Katalog';

  constructor(
    private _http: HttpClient,
    private token:TokenService,
    private url: RouteApiService
    ) { }



  public Katalogs = (): Observable<Katalog[]> => {
    let action='get';
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
       Authorization: 'Bearer ' + this.token.AccessToken,
    });
    let url: string = this.createCompleteRoute(
      environment.serverRoot,
      this.controller,
      action
    );

    return this._http.get<Katalog[]>(url, { headers });
  };

  //------------------------------------------------

  public Create = (item: Katalog): Observable<any> => {

    let action='Post';
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.token.AccessToken,
    });
    let url: string = this.createCompleteRoute(
      environment.serverRoot,
      this.controller,
      action
    );
    return this._http.post(url, item);
  }

  //-----------------------------------

  public Update = (item: Katalog): Observable<any> => {
   // throw new Error("not implemint exeption");

   let action='put'
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.token.AccessToken,
    });
    let url: string = this.createCompleteRoute(
      environment.serverRoot,
      this.controller,
      action
    );
    return this._http.put(url, item);
  }
  //-------------------

  public Delete = (id: number): Observable<any> => {

    let action='delete'
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.token.AccessToken,
    });
    let url: string = this.createCompleteRoute(
      environment.serverRoot,
      this.controller,
      action
    )+'/'+id;
    return this._http.delete(url);
  }

  private createCompleteRoute = (envAddress: string, controller: string,action:string) => {
    return `${envAddress}api/${controller}/${action}`;
  };
}
