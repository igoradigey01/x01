import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from 'src/app/shared/_interfaces/product.model';
import { Katalog } from 'src/app/shared/_interfaces/katalog.model';
import { TypeProduct } from '../../../shared/_interfaces/product-type.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ManagerServiceModule } from './maneger-service.module';
import { KatalogService } from './katalog.service';
import { RouteApiService } from 'src/app/shared/sevices/route-api.service';
import { TokenService } from 'src/app/shared/sevices/token.service';

@Injectable({
  providedIn: ManagerServiceModule,
})
export class ProductService {

  _nameKatalog: any = '';
  //readonly _url:string="Type";

  get RootSrcImg(): string {
    // return this.http.get(src,{responseType: 'blob'});

    return   this._url.RootImage                //environment.serverRoot + 'images/';
  }

  constructor(
    private _http: HttpClient,
    private _katalogServise: KatalogService,
    private _token: TokenService,
    private _url: RouteApiService
  ) { }

  //-----------------------

  //-----------------------
  public TypeProducts(): Observable<TypeProduct[]> {
    this._url.Controller = 'typeProduct';
    this._url.Action = ''
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
    return this._http.get<TypeProduct[]>(this._url.Url, { headers });
  }

  //------------- Get all Katalog------------
  public Katalogs = (): Observable<Katalog[]> => {
    return this._katalogServise.Katalogs();
  };

  //------------------- Get all Product--------
  public Products(idKatalog: number): Observable<Product[]> {

    this._url.Controller = 'product';
    this._url.Action = ''
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
    let url: string = this._url.Url + '/' + idKatalog;

    return this._http.get<Product[]>(url, { headers });
  }

  //---------------
  public Create = (item: Product): Observable<any> => {
    // throw new Error('not implemint exeption');
    this._url.Controller = 'product';
    this._url.Action = 'Post';

    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this._token.AccessToken,
    });

    return this._http.post(this._url.Url, item, { headers });
  };

  //--------------
  public Update = (item: Product): Observable<any> => {
    throw new Error('not implemint exeption');
  };

  //--------------------------
  public Delete = (id: number): Observable<any> => {
    throw new Error('not implemint exeption');
  };

  public GetBlobIMG = (name: string): Observable<Blob> => {
    this._url.Controller = 'image';
    this._url.Action = '';
    // return this.http.get(src,{responseType: 'blob'});

    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });

     let url: string =this._url.Url + '/' + name;


    return this._http.get<Blob>(url, {
      headers,
      responseType: 'blob' as 'json',
    });
    // return this.http.get<Blob>(url, { headers });
  };


}
