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
    private _token:TokenService,
    private _url: RouteApiService
    ) {
      
    }



  public Katalogs = (): Observable<Katalog[]> => {
    this._url.Controller = 'Katalog';
    this._url.Action = 'get';

    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
       Authorization: 'Bearer ' + this._token.AccessToken,
    });


    return this._http.get<Katalog[]>(this._url.Url, { headers });
  };

  //------------------------------------------------

  public Create = (item: Katalog): Observable<any> => {

    this._url.Controller = 'Katalog';
    this._url.Action = 'Post';
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this._token.AccessToken,
    });

    let fd = this.createFormData(item);

    new Response(fd).text().then(console.log);

    return this._http.post(this._url.Url, fd,{
      reportProgress: true,
      observe: 'events',
      headers,
    });
  }

  //-----------------------------------

  public Update = (item: Katalog): Observable<any> => {
   // throw new Error("not implemint exeption");
   this._url.Controller = 'Katalog';
   this._url.Action = 'put';

    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this._token.AccessToken,
    });
    let fd = this.createFormData(item);

    new Response(fd).text().then(console.log);
    return this._http.put(this._url.Url, fd,{
      reportProgress: true,
      observe: 'events',
      headers,
    });
  }
  //-------------------

  public Delete = (id: number): Observable<any> => {
    this._url.Controller = 'Katalog';
    this._url.Action = 'delete';


    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this._token.AccessToken,
    });
    let url: string = this._url.Url+'/'+id;
    return this._http.delete(url,{headers});
  }
  private createFormData(item: Katalog ): FormData {
    const formData = new FormData();

    const entries = Object.entries(item);

      // debugger
      entries.forEach(([key, value]) => {
        //  if (key == 'katalogName') return;

       /*  if (key == 'imageWebp') {
          let f = value as File;
          formData.append('file', f, f.name);
          return;
        } */

        formData.append(key, value);

      });




    return formData;
  }

}
