import { Injectable } from '@angular/core';
import { Color } from 'src/app/core-nomenclature/_interfaces/color.model';
import { Brand } from 'src/app/core-nomenclature/_interfaces/brand.model';
import { Article } from 'src/app/core-nomenclature/_interfaces/article.model';
import { KatalogN } from 'src/app/core-nomenclature/_interfaces/katalog-n.model';
import {SEO_var}   from '../_interfaces/SEO-var.models'
import {ManagerServiceModule} from './maneger-service.module'

@Injectable({
  providedIn: ManagerServiceModule
}
)
export class NomenclatrueVarService {

  private _seoVar:SEO_var|undefined;
  private  _clorNs:Color[]=[];
  private _brandNs:Brand[]=[];
  private _articleNs:Article[]=[];
  private _katlogNs:KatalogN[]=[];
  private _idCategoria:number=-1;

  public get SEO_let():SEO_var|undefined{
    return this._seoVar;
  }
  public set SEO_let(seoVar:SEO_var|undefined){
    this._seoVar=seoVar;
  }

  public get ColorNs():Color[]{
    return this._clorNs;
  }
  public set ColorNs(colorNs:Color[]){
   if(colorNs)  this._clorNs=colorNs;
  }

  public get BrandNs():Brand[]{
    return this._brandNs;
  }
  public set BrandNs(brandNs:Brand[]){
    this._brandNs=brandNs;
  }

  public get ArticleNs():Article[]{
    return this._articleNs;
  }
  public set ArticleNs(articleNs:Article[]){
    this._articleNs=articleNs;
  }


  public get KatalogNs():KatalogN[]{
    return this._katlogNs;
  }
  public set KatalogNs(katalogNs:KatalogN[]){
   if(katalogNs)  this._katlogNs=katalogNs;
  }

  public set IdCategoria(id:number){
    this._idCategoria=id;

  }
  public get IdCategoria(){
    return this._idCategoria;
  }




  constructor() { }
}
