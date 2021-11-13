import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/_interfaces/product.model';
import { TypeProduct } from '../../../shared/_interfaces/product-type.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouteApiService } from 'src/app/shared/sevices/route-api.service';

@Injectable()
export class ProductDataService {
  //readonly _url:string="Type";

  constructor(
    private http: HttpClient,
    private url: RouteApiService
    ) {
  //  url.Controller = 'product';
  }

  //-----------------------

  //-----------------------
  public TypeProducts(): Observable<TypeProduct[]> {
    this.url.Controller = 'typeProduct';
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });

    return this.http.get<TypeProduct[]>(this.url.Url, { headers });
  }

  //-------------------
  public Products(idKatalog: number): Observable<Product[]> {
    this.url.Controller = 'product';
    this.url.Action=''

    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });

    return this.http.get<Product[]>(this.url.Url + '/' + idKatalog, {
      headers,
    });
  }
    /** src root for  images */
  public get RootImg(): string {
    // return this.http.get(src,{responseType: 'blob'});

    return this.url.RootImage;
  }
}
