import { Injectable } from '@angular/core';
import { ManagerServiceModule } from './maneger-service.module';
import {TokenService} from 'src/app/shared/services/token.service';
import { RouteApiService } from 'src/app/shared/services/route-api.service';

@Injectable({ providedIn: ManagerServiceModule })
export class ContentService {

  constructor(
    private token:TokenService ,
    private url: RouteApiService
  ) {}

  get RootImg(): string {
    // return this.http.get(src,{responseType: 'blob'});

    return this.url.WWWroot;
  }


}
