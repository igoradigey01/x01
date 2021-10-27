import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ManagerServiceModule } from './maneger-service.module';
import { VertionInfo } from 'src/app/shared/_interfaces/vertion-info.model';

@Injectable({ providedIn: ManagerServiceModule })
export class InfoService {
  readonly _controllerBase: string = 'Version';

  constructor(private http: HttpClient) {}
  //----------------------------

  get Vertion(): Observable<VertionInfo> {
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
    let url: string = this.createCompleteRoute(
      environment.serverRoot,
      this._controllerBase
    );

    //  console.log('Info-servise-getVertion()---------');
    return this.http.get<VertionInfo>(url, { headers }).pipe(
      map((obj: any) => {
      //  let obj = data['VertionInfo'];
        return obj.map(function (obj: any): VertionInfo {
          return <VertionInfo>{ verion: obj.v, description: obj.description };
        });
      })
    );
  }

  get RootSrcImg(): string {
    // return this.http.get(src,{responseType: 'blob'});

    return environment.serverRoot + 'images/';
  }

  private createCompleteRoute = (envAddress: string, controller: string) => {
    return `${envAddress}api/${controller}`;
  };
}
