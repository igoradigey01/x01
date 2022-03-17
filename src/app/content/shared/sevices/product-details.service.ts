import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageDetile } from 'src/app/shared/_interfaces/image-detile.model';
import { RouteApiService } from 'src/app/shared/services/route-api.service';

@Injectable()
export class ProductDetailsService {
  constructor(
    private _http: HttpClient,
    private _url: RouteApiService
  ) {
    //url.Controller = 'ProductItem';
  }

  public  GetImages(idProduct: number): Observable<ImageDetile[]> {
    this._url.Controller = 'ProductItem';
    this._url.Action = 'GetImages';
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });

    let url: string = this._url.Url + '/' + idProduct;

    return this._http.get<ImageDetile[]>(url, { headers });
  }

  /** src root for  images */
  public get RootImg(): string {
    // return this.http.get(src,{responseType: 'blob'});

    return this._url.RootImage;
  }

  public GetBlobIMG(name: string): Observable<Blob> {

    this._url.Controller = 'image';
    this._url.Action = '';
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
    let url: string = this._url.Url + '/' + name;

    return this._http.get(url, { headers, responseType: 'blob' });
  }
}
