import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from 'src/app/shared/_interfaces/product.model';
import { Katalog } from 'src/app/shared/_interfaces/katalog.model';
import { TypeProduct } from '../../../shared/_interfaces/product-type.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ManagerServiceModule } from './maneger-service.module';
import { KatalogService } from './katalog.service';
import { RouteApiService } from 'src/app/shared/sevices/route-api.service';
import { TokenService } from 'src/app/shared/sevices/token.service';

enum FlagState {
  all,
  date,
  img,
}

@Injectable({
  providedIn: ManagerServiceModule,
})
export class ProductService {
  _nameKatalog: any = '';
  //readonly _url:string="Type";

  get RootSrcImg(): string {
    // return this.http.get(src,{responseType: 'blob'});

    return this._url.RootImage; //environment.serverRoot + 'images/';
  }

  constructor(
    private _http: HttpClient,
    private _katalogServise: KatalogService,
    private _token: TokenService,
    private _url: RouteApiService
  ) {}

  //-----------------------

  //-----------------------
  /**Subscribe to Get- Models  Product*/
  public TypeProducts = (): Observable<TypeProduct[]> => {
    this._url.Controller = 'typeProduct';
    this._url.Action = '';
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
    return this._http.get<TypeProduct[]>(this._url.Url, { headers });
  };

  //------------- Get all Katalog------------
  public Katalogs = (): Observable<Katalog[]> => {
    return this._katalogServise.Katalogs();
  };

  //------------------- Get all Product--------
  public Products = (
    idKatalog: number,
    nameKatalog: string | undefined
  ): Observable<Product[]> => {
    this._url.Controller = 'product';
    this._url.Action = '';
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
    let url: string = this._url.Url + '/' + idKatalog;

    return this._http.get<Product[]>(url, { headers }).pipe(
      map((data: any) => {
        //  console.log(JSON.stringify(data))
        return data.map((f: any) => {
          return <Product>{
            id: f.id,
            name: f.name,
            katalogId: f.katalogId,
            katalogName: nameKatalog,
            typeProductId: f.typeProductId,
            price: f.price,
            markup: f.markup,
            description: f.description,
            //            -------------
            imgName: f.image,
            rootImgSrc: this._url.RootImage,
          };
        });
      })
    );
  };

  //---------------
  public Create = (item: Product): Observable<any> => {
    // debugger
    // throw new Error('not implemint exeption');
    this._url.Controller = 'product';
    this._url.Action = 'Create'; //Post
    // debugger
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this._token.AccessToken,
    });

    let fd = this.createFormData(item,FlagState.all);

    //!!!!!!--  new Response(fd).text().then(console.log);--!!!!!!!!!!!!
    return this._http.post(this._url.Url, fd, {
      reportProgress: true,
      observe: 'events',
      headers,
    });

    // return this._http.post(this._url.Url, fd, { headers },);
  };



  //--------------
  public UpdateAll = (item: Product): Observable<any> => {
    // debugger
    this._url.Controller = 'product';
    this._url.Action = 'UpdateAll';

    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this._token.AccessToken,
    });

    let fd = this.createFormData(item,FlagState.all);

  //!!!!  new Response(fd).text().then(console.log);

    return this._http.put(this._url.Url + '/' + item.id, fd, {
      reportProgress: true,
      observe: 'events',
      headers,
    });
  };

  public UpdateOnlyImg = (item: Product): Observable<any> => {
    this._url.Controller = 'product';
    this._url.Action = 'UpdateOnlyImg';

    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this._token.AccessToken,
    });

    let fd = this.createFormData(item,FlagState.img);

   new Response(fd).text().then(console.log);

    return this._http.put(this._url.Url + '/' + item.imgName, fd, {
      reportProgress: true,
      observe: 'events',
      headers,
    });
  };

  public UpdateIgnoreImg = (item: Product): Observable<any> => {
    this._url.Controller = 'product';
    this._url.Action = 'UpdateIgnoreImg';

    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this._token.AccessToken,
    });
     //   debugger
    let fd = this.createFormData(item,FlagState.date);

   // !!! new Response(fd).text().then(console.log);

    return this._http.put(this._url.Url + '/' + item.id, fd, {
      reportProgress: true,
      observe: 'events',
      headers,
    });
  };
  //--------------------------
  public Delete = (id: number): Observable<any> => {
    this._url.Controller = 'product';
    this._url.Action = 'Delete';

    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this._token.AccessToken,
    });
    return this._http.delete(this._url.Url + '/' + id, {
      reportProgress: true,
      observe: 'events',
      headers,
    });
  };

  public GetFileFromImageController = (name: string): Observable<Blob> => {
    this._url.Controller = 'image';
    this._url.Action = '';
    // return this.http.get(src,{responseType: 'blob'});

    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });

    let url: string = this._url.Url + '/' + name;

    return this._http.get<Blob>(url, {
      headers,
      responseType: 'blob' as 'json',
    });
    // return this.http.get<Blob>(url, { headers });
  };

  private createFormData(item: Product, flag: FlagState): FormData {
   let formData = new FormData();

    const entries = Object.entries(item);
    if (flag == FlagState.all) {
      // debugger
      entries.forEach(([key, value]) => {
        //  if (key == 'katalogName') return;
        if (key == 'typeProductName') return;
        // if (key == 'imgName') return;
        if (key == 'rootImgSrc') return;
        if (key == 'imageBase64') return;
        if (key == 'imageWebp') {
          let f = value as File;
          formData.append('file', f, f.name);
          return;
        }

        formData.append(key, value);
        // console.log(`${key}: ${value}`)
      });

      return formData;
    }
    if (flag === FlagState.date) {
      entries.forEach(([key, value]) => {
        //  if (key == 'katalogName') return;
        if (key == 'typeProductName') return;
        // if (key == 'imgName') return;
        if (key == 'rootImgSrc') return;
        if (key == 'imageBase64') return;
        if (key == 'imageWebp') return;

        formData.append(key, value);
        // console.log(`${key}: ${value}`)
      });

      return formData;
    }

    if (flag === FlagState.img) {
      entries.forEach(([key, value]) => {


        if(key=='imgName'){

          formData.append(key, value);
          return;

        }

        if (key == 'imageWebp') {
          let f = value as File;
          formData.append('file', f, f.name);
          return;
        }
      });

    }
    return formData;
  }
}
