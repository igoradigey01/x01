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
  readonly path: string = 'Katalog';

  constructor(private _http: HttpClient) { }



  public Katalogs = ():Observable<any> => {
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
     let url: string = this.createCompleteRoute(
      environment.serverRoot ,
      this.path
    );

    return this._http.get(url, { headers });
  };

  private createCompleteRoute = (  envAddress: string ,controller: string) => {
    return `${envAddress}api/${controller}`;
  };
}
