import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Katalog } from '../../../shared/_interfaces/katalog.model';
import { RouteApiService } from 'src/app/shared/services/route-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KatalogService {
  constructor(
    private _http: HttpClient,
    private url: RouteApiService
  ) {
   // url.Controller = 'Katalog';
   // console.log("test -- Katalog Servises - init ok")
  }

  public Katalogs = (): Observable<Katalog[]> => {
    this.url.Controller = 'Katalog';
    this.url.Action = 'get';
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });

    return this._http.get<Katalog[]>(this.url.Url, { headers });
  };
}
