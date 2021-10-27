import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ManagerServiceModule } from './maneger-service.module';

@Injectable({ providedIn: ManagerServiceModule })
export class ContentService {

  constructor() {}

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
