import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContentModule } from './../../content.module';
import { Katalog } from '../../../shared/_interfaces/katalog.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KatalogService {
  readonly controller: string = 'Katalog';

  constructor(private _http: HttpClient) { }



  public Katalogs = ():Observable<any> => {
    let action="get"
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
     let url: string = this.createCompleteRoute(
      environment.serverRoot ,
      this.controller,
      action
    );

    return this._http.get(url, { headers });
  };

  private createCompleteRoute = (  envAddress: string ,controller: string,action:string) => {
    return `${envAddress}api/${controller}/${action}`;
  };
}
