import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ManagerServiceModule } from './maneger-service.module';
import {TokenService} from 'src/app/shared/sevices/token.service';
import { RouteApiService } from 'src/app/shared/sevices/route-api.service';

@Injectable({ providedIn: ManagerServiceModule })
export class ContentService {

  constructor(
    private token:TokenService ,
    private url: RouteApiService
  ) {}

  get RootSrcImg(): string {
    // return this.http.get(src,{responseType: 'blob'});

    return environment.serverRoot + 'images/';
  }

  private createCompleteRoute = (
    envAddress: string,
    controller: string,
    action: string
  ) => {
    return `${envAddress}api/${controller}/${action}`;
  };
}
