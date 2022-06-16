import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class RouteApiService {



  private _serverRoot: string | undefined;
  private _controller: string = '';
  private _action: string | null = null;
  private _id: number | null = null;
  private _postavchik_X01_Id: number | undefined;
  private _postavchik_FX01_Id: number | undefined;

  constructor() {
    this._postavchik_X01_Id = +environment.postavchik_X01_Id;
    this._postavchik_FX01_Id= +environment.postavchik_XF01_Id;
    this._serverRoot = environment.serverRoot;
  }

  public set Controller(name: string) {
    this._controller = name;
  }

  public set Action(name: string | null) {
    this._action = name;
  }

  public set ID(id: number | null) {
    this._id = id;
  }

  public get Postavchik_X01_Id(): number {
    if (this._postavchik_X01_Id) return this._postavchik_X01_Id;
    else return -1;
  }

  public get Postavchik_XF01_Id(): number {
    if (this._postavchik_FX01_Id) return this._postavchik_FX01_Id;
    else return -1;
  }

  public get Url(): string {
    if (this._serverRoot)
      return this.createCompleteRoute(
        this._serverRoot,
        this._controller,
        this._action,
        this._id
      );
    else throw new Error(' environment serverRoot -undefined'); //return 'undefined';
  }

  /** path server image wwwroot/image*/
  public get WWWroot(): string {
    return `${this._serverRoot}images/`;

  }

  private createCompleteRoute = (
    envAddress: string,
    controller: string,
    action: string | null,
    id: number | null
  ) => {
    //debugger;
    if (id) return `${envAddress}api/${controller}/${action}/${id}`;
    if (action) return `${envAddress}api/${controller}/${action}`;
   // debugger;
    return `${envAddress}api/${controller}`;
  };
  // private _serverRoot = environment.serverRoot;
  // private _controller: string = '';
  // private _action: string | null = null;
  // private _controllerImage: string = 'image';

  // constructor() { }

  // public set Controller(name: string) {
  //   this._controller = name;
  // }

  // public set Action(name: string|null) {
  //   this._action = name;
  // }


  // public get Url() {
  //   return this.createCompleteRoute(this._serverRoot, this._controller, this._action)
  // }

  //  /** path server image */
  // public get RootImage(): string {

  //   return `${this._serverRoot}images/`;;

  // }

  // private createCompleteRoute = (envAddress: string, controller: string, action: string | null) => {
  //   if (action)
  //     return `${envAddress}api/${controller}/${action}`;
  //   return `${envAddress}api/${controller}`;

  // };

}
