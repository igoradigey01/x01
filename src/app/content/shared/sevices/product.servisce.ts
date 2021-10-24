import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../../shared/_interfaces/product.model';
import { TypeProduct } from '../../../shared/_interfaces/product-type.model';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ContentModule } from './../../content.module';

@Injectable()
export class ProductDataService {


  readonly _controllerPath: string = 'product';
  readonly _controllerTypeProduct: string = 'typeProduct';
  readonly _controllerImage: string = 'image';

  _nameKatalog: any = '';
  //readonly _url:string="Type";



  constructor(private http: HttpClient) { }

  //-----------------------


  //-----------------------
  GetTypeProduct(): Observable<TypeProduct[]> {

    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
    let url: string = this.createCompleteRoute(
      environment.serverRoot,
      this._controllerTypeProduct
    );


    return this.http.get<TypeProduct[]>(url, { headers });
  }

  //-------------------
  Products(idKatalog: number): Observable<Product[]> {
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
    let url: string = this.createCompleteRoute(
      environment.serverRoot,
      this._controllerPath
    );



    return this.http.get<Product[]>(url + '/' + idKatalog, { headers });
  }

  get RootUrlImg(): string {
    // return this.http.get(src,{responseType: 'blob'});

    return environment.serverRoot+'images/';
  }





  private createCompleteRoute = (envAddress: string, controller: string) => {
    return `${envAddress}api/${controller}`;
  };
}
