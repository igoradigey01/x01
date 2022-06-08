import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpParams } from '@angular/common/http';
//import { environment } from 'src/environments/environment';
import { ManagerServiceModule } from './maneger-service.module';
import {TokenService} from 'src/app/_shared/services/token.service';
import { RouteApiService } from 'src/app/_shared/services/route-api.service';
import { Nomenclature } from 'src/app/_shared/_interfaces/nomenclature.model';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { Color } from 'src/app/_shared/_interfaces/color.model';
import { Brand } from 'src/app/_shared/_interfaces/brand.model';
import { Article } from 'src/app/_shared/_interfaces/article.model';
import { KatalogN } from 'src/app/_shared/_interfaces/katalog-n.model';


@Injectable({
  providedIn: ManagerServiceModule
})
export class NomenclatureService {

  constructor(
    private _http: HttpClient,
    private _token:TokenService,
    private _url: RouteApiService,


  ){}

    /**Postavchik + Katalog get Nomenclature*/
  public NomenclaturePKs = (idKatlaog:number): Observable<Nomenclature[]> => {
    this._url.Controller = 'Nomenclature';
    this._url.Action = 'NomenclaturePKs';
    this._url.ID=idKatlaog;


    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
    let params:HttpParams=new HttpParams().set('postavchikId',this._url.PostavchikId)

    const httpOptions={headers,params}
    return this._http.get<Nomenclature[]>(this._url.Url, httpOptions) .pipe(
      map((data: any) => {
        //  console.log(JSON.stringify(data))
        return data.map((f: any) => {
          return <Nomenclature>{
            id:f.id,
            articleId:f. articleId,
            brandId:f.brandId,
            colorId:f.colorId,
            description:f.description,
            guid:f.guid,
            hidden:f.hidden,
            inStock:f.inStock,
            sale:f.sale,
            katalogId:f.katalogId,
            markup:f.markup,
            postavchikId:f.postavchikId,
            name:f.name,
            position:f.position,
            price:f.price,

            wwwroot: this._url.WWWroot,
          };
        });
      })
    );
  };


  public Nomenclature = (idNomenclature:number): Observable<Nomenclature> => {
    this._url.Controller = 'Nomenclature';
    this._url.Action = 'Item';
    this._url.ID=idNomenclature;


    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
   // let params:HttpParams=new HttpParams().set('postavchikId',this._url.PostavchikId)

    const httpOptions={headers}
    return this._http.get<Nomenclature>(this._url.Url, httpOptions) .pipe(
      map((f: any) => {
        //  console.log(JSON.stringify(data))
        return <Nomenclature>{
            id:f.id,
            articleId:f. articleId,
            // not work  ,not load
          //  articleName:this.sharedVar.ArticleNs.length>0?this.sharedVar.ArticleNs.find(d=>d.id===f.articleId)?.name:undefined,
            brandId:f.brandId,
         //  brandName:this.sharedVar.BrandNs.length>0?this.sharedVar.BrandNs.find(d=>d.id===f.articleId)?.name:undefined,
            colorId:f.colorId,
        //    colorName:this.sharedVar.ColorNs.length>0?this.sharedVar.ColorNs.find(d=>d.id===f.articleId)?.name:undefined,
            description:f.description,
            guid:f.guid,
            hidden:f.hidden,
            inStock:f.inStock,
            sale:f.sale,
            katalogId:f.katalogId,
           // katalogName:this.sharedVar.
            markup:f.markup,
            postavchikId:f.postavchikId,
            name:f.name,
            position:f.position,
            price:f.price,

            wwwroot: this._url.WWWroot,
          };

      })
    );
  };

  ///  for: nomenclatureItem  ___________________

  public ArticleNs = (): Observable<Article[]> => {
    this._url.Controller = 'ArticleN';
    this._url.Action = 'getPostavchik';
    this._url.ID=this._url.PostavchikId;

    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
     //  Authorization: 'Bearer ' + this._token.AccessToken,
    });


    return this._http.get<Article[]>(this._url.Url, { headers });
  };


  public BrandNs = (): Observable<Brand[]> => {
    this._url.Controller = 'BrandN';
    this._url.Action = 'getPostavchik';
    this._url.ID=this._url.PostavchikId;
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
     //  Authorization: 'Bearer ' + this._token.AccessToken,
    });


    return this._http.get<Brand[]>(this._url.Url, { headers });
  };

  public ColorNs = (): Observable<Color[]> => {
    this._url.Controller = 'ColorN';
    this._url.Action = 'getPostavchik';
    this._url.ID=this._url.PostavchikId;

    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      // Authorization: 'Bearer ' + this._token.AccessToken,
    });


    return this._http.get<Color[]>(this._url.Url, { headers });
  };
  public KatalogN=(idKatalog:number ):Observable<KatalogN>=>{
    this._url.Controller = 'KatalogN';
      this._url.Action = 'Item';
      this._url.ID=idKatalog;


      let headers: HttpHeaders = new HttpHeaders({
        Accept: 'application/json',
         Authorization: 'Bearer ' + this._token.AccessToken,
      });


      return this._http.get<KatalogN>(this._url.Url, { headers });

  }

}
