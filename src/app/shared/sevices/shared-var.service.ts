import { Injectable } from '@angular/core';
import {SEO_var}   from 'src/app/shared/_interfaces/SEO-var.models'
@Injectable()
export class SharedVarService {

  private _seoVar:SEO_var|undefined;

  public get SEO_let():SEO_var|undefined{
    return this._seoVar;
  }

  public set SEO_let(seoVar:SEO_var|undefined){
    this._seoVar=seoVar;
  }

  constructor() { }
}
