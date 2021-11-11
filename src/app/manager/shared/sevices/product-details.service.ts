import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageDetile } from 'src/app/shared/_interfaces/image-detile.model';

import { ProductDetile } from 'src/app/shared/_interfaces/product-detile.model';
import { ManagerServiceModule } from '../../shared/sevices/maneger-service.module';
import { KatalogService } from './katalog.service';
import { Katalog } from 'src/app/shared/_interfaces/katalog.model';
import {Product} from 'src/app/shared/_interfaces/product.model';
import { RouteApiService } from 'src/app/shared/sevices/route-api.service';

@Injectable({ providedIn: ManagerServiceModule })
export class ProductDetailsService {
  readonly path_productDetails: string = 'ProductItem'; // default controllerProductDetailsPath
  readonly path_Product: string = 'product';
  readonly path_KatalogPath: string = 'katalog';
  readonly path_BlobImage: string = 'image'; // name controller
  //[Route("api/[controller]/[action]")]--api server
  readonly action_GetImages: string = 'GetImages'; // Action on default  controller
  readonly action_AddImage: string = 'CreateImage';
  readonly action_DeleteImage: string = 'Delete';
  readonly action_GetItemProduct: string = 'GetItemProducts';

  //----------------------------

  public get RootSrcImg(): string {
    // return this.http.get(src,{responseType: 'blob'});

    return environment.serverRoot + 'images/';
  }
  //--------
  public get Katalogs(): Observable<Katalog[]> {
    return this.katalogServise.Katalogs();
  }
  //------------------
  public  Products(idKatalog: number): Observable<Product[]> {
    throw new Error('not implemint exeption');
   // return this.http.get<Product[]>(this.GetUrlProduct + '/' + idKatalog);
  }

  constructor(
    private http: HttpClient,
    private katalogServise: KatalogService,
    private url: RouteApiService
  ) {}

  GetImages(idProduct: number): Observable<ImageDetile[]> {
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });

    let url: string =
      this.createCompleteRoute(
        environment.serverRoot,
        this.path_productDetails,
        this.action_GetImages
      ) +
      '/' +
      idProduct;

    return this.http.get<ImageDetile[]>(url, { headers });
  }

  GetBlobIMG(name: string): Observable<Blob> {
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
    let url: string =
      this.createCompleteRoute(
        environment.serverRoot,
        this.path_BlobImage,
        ''
      ) +
      '/' +
      name;

    return this.http.get(url, { headers, responseType: 'blob' });
  }
  //-----------------

  //---------------
  public Create = (item: ProductDetile): Observable<any> => {
    throw new Error('not implemint exeption');
  };
  //--------------
  public Update = (item: ProductDetile): Observable<any> => {
    throw new Error('not implemint exeption');
  };
  //--------------------------
  public Delete = (id: number): Observable<any> => {
    throw new Error('not implemint exeption');
  };

  AddImage(item: ImageDetile):Observable<any> {
    const formData = new FormData();

    throw new Error('not implemint exeption');

    // photo- base64 string
   /*  Object.keys(item).forEach((key) => {
      //  console.log(key + '' + item[key]);
      //if (key != 'photo') 04..5.21
      formData.append(key, item[key]);
    });
    return this.http.post(this.AddUrl, formData,{ reportProgress: true,observe: 'events'}); */
  }
  DeleteImage(idImage: number):Observable<any> {

    console.log("----delete----");
    throw new Error('not implemint exeption');
   // return this.http.delete(this.DeleteUrl+'/'+idImage);



  }
  private createCompleteRoute = (
    envAddress: string,
    controller: string,
    action: string
  ) => {
    return `${envAddress}api/${controller}/${action}`;
  };
}
