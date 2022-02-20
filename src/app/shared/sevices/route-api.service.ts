import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class RouteApiService {
  private _serverRoot = environment.serverRoot;
  private _controller: string = '';
  private _action: string | null = null;
  private _controllerImage: string = 'image';

  constructor() { }

  public set Controller(name: string) {
    this._controller = name;
  }

  public set Action(name: string|null) {
    this._action = name;
  }


  public get Url() {
    return this.createCompleteRoute(this._serverRoot, this._controller, this._action)
  }

   /** path server image */
  public get RootImage(): string {

    return `${this._serverRoot}images/`;;

  }

  private createCompleteRoute = (envAddress: string, controller: string, action: string | null) => {
    if (action)
      return `${envAddress}api/${controller}/${action}`;
    return `${envAddress}api/${controller}`;

  };

}
