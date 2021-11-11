import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageDetile } from 'src/app/shared/_interfaces/image-detile.model';
import { RouteApiService } from 'src/app/shared/sevices/route-api.service';

@Injectable()
export class ProductDetailsService {
  constructor(
    private http: HttpClient,
    private url: RouteApiService
  ) {
    url.Controller = 'ProductItem';
  }

  GetImages(idProduct: number): Observable<ImageDetile[]> {
    this.url.Action = 'GetImages';
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });

    let url: string = this.url.Url + '/' + idProduct;

    return this.http.get<ImageDetile[]>(url, { headers });
  }

  GetBlobIMG(name: string): Observable<Blob> {
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
    let url: string = this.url.UrlImage + '/' + name;

    return this.http.get(url, { headers, responseType: 'blob' });
  }
}
