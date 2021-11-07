import { Expression } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly accessTokenName: string = 'access_token';

  constructor() { }

  public get Get(){
   throw new Error("not Empliment");
  }
  public set Set(token:string){
    throw new Error("not Empliment");

  }
}
