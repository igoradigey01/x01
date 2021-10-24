import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from 'src/app/shared/_interfaces/image.model';
import { ContentModule } from './../../content.module';

@Injectable({ providedIn: ContentModule })
export class ProductDetailsDataService {
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







  constructor(private http: HttpClient) { }

  GetImages(idProduct: number): Observable<Image[]> {

    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });

     let url: string = this.createCompleteRoute(
      environment.serverRoot ,
      this.path_productDetails,this.action_GetImages
    )+ '/' + idProduct;

    return this.http.get<Image[]>(url,{headers});
  }

  GetBlobIMG(name: string): Observable<Blob> {

    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
     let url: string = this.createCompleteRoute(
      environment.serverRoot ,
      this.path_BlobImage,''
    )+ '/' + name;


    return this.http.get(url, { headers, responseType: 'blob' });
  }



  private createCompleteRoute = (envAddress: string, controller: string,action:string) => {
    return `${envAddress}api/${controller}/${action}`;
  };



}