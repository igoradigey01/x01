import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/_interfaces/product.model';
import { Material } from '../../../shared/_interfaces/material.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouteApiService } from 'src/app/shared/services/route-api.service';
import {ManagerServiceModule} from './maneger-service.module'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: ManagerServiceModule
})
export class ProductDataService {
  //readonly _url:string="Type";

  constructor(private _http: HttpClient, private _url: RouteApiService) {
    //  url.Controller = 'product';
  }

  //-----------------------

  //-----------------------
  public Materials(): Observable<Material[]> {
    this._url.Controller = 'materialP';
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });

    return this._http.get<Material[]>(this._url.Url, { headers });
  }

  //-------------------
  public Products(idKatalog: number,nameKatalog:string|undefined): Observable<Product[]> {
   
    this._url.Controller = 'product';
    this._url.Action = '';

    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
      console.log("product serveise --- ok ")
    return this._http.get<Product[]>(this._url.Url + '/' + idKatalog, {
      headers,
    }).pipe(
      map((data: any) => {
        //  console.log(JSON.stringify(data))
        return data.map((f: any) => {
          return <Product>{
            id: f.id,
            name: f.name,
            katalogId: f.katalogId,
            katalogName: nameKatalog,
            materialId: f.typeProductId,
            price: f.price,
            markup: f.markup,
            description: f.description,
            //            -------------
          
            imageGuid: f.imageGuid,
            wwwroot: this._url.WWWroot,
          };
        });
      })
    );
  }
  /** src root for  images */
  public get RootImg(): string {
    // return this.http.get(src,{responseType: 'blob'});

    return this._url.WWWroot;
  }
}
