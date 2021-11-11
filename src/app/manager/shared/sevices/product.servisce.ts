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

@Injectable({
  providedIn: ManagerServiceModule,
})
export class ProductService {
  readonly _controllerBase: string = 'product';
  readonly _controllerTypeProduct: string = 'typeProduct';
  readonly _controllerImage: string = 'image';

  _nameKatalog: any = '';
  //readonly _url:string="Type";

  get RootSrcImg(): string {
    // return this.http.get(src,{responseType: 'blob'});

    return environment.serverRoot + 'images/';
  }

  constructor(
    private http: HttpClient,
    private katalogServise: KatalogService,
    private url: RouteApiService
  ) {}

  //-----------------------

  //-----------------------
  TypeProducts(): Observable<TypeProduct[]> {
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
  //------------- Get all Katalog------------
  public Katalogs = (): Observable<Katalog[]> => {
    return this.katalogServise.Katalogs();
  };
  //------------------- Get all Product--------
  Products(idKatalog: number): Observable<Product[]> {
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
    let url: string = this.createCompleteRoute(
      environment.serverRoot,
      this._controllerBase
    );

    return this.http.get<Product[]>(url + '/' + idKatalog, { headers });
  }
  //---------------
  public Create = (item: Product): Observable<any> => {
    throw new Error('not implemint exeption');
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
    // return this.http.get(src,{responseType: 'blob'});

    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
    let url: string =
      this.createCompleteRoute(environment.serverRoot, this._controllerImage) +
      '/' +
      name;

    return this.http.get<Blob>(url, {
      headers,
      responseType: 'blob' as 'json',
    });
    // return this.http.get<Blob>(url, { headers });
  };

  private createCompleteRoute = (envAddress: string, controller: string) => {
    return `${envAddress}api/${controller}`;
  };
}
