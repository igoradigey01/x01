import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ManagerServiceModule } from './maneger-service.module';
import { VertionInfo } from 'src/app/shared/_interfaces/vertion-info.model';
import {TokenService} from 'src/app/shared/sevices/token.service';
import { RouteApiService } from 'src/app/shared/sevices/route-api.service';

@Injectable({ providedIn: ManagerServiceModule })

export class InfoService {


  constructor(
    private http: HttpClient,
    private token:TokenService,
    private url: RouteApiService
    ) {
     // url.Controller='Version';-
    }
  //----------------------------

  get Vertion(): Observable<VertionInfo> {
     this.url.Controller='Version';
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });


    //  console.log('Info-servise-getVertion()---------');
    return this.http.get<VertionInfo>(this.url.Url, { headers }).pipe(
      map((obj: any) => {
      //  let obj = data['VertionInfo'];
        return obj.map(function (obj: any): VertionInfo {
          return <VertionInfo>{ verion: obj.v, description: obj.description };
        });
      })
    );
  }

  get RootImg(): string {
    // return this.http.get(src,{responseType: 'blob'});

    return this.url.RootImage;
  }


}
