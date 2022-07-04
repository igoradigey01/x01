import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { ManagerServiceModule } from './maneger-service.module';
import { TokenService } from 'src/app/shared/services/token.service';
import { RouteApiService } from 'src/app/shared/services/route-api.service';
import { Nomenclature } from 'src/app/core-nomenclature/_interfaces/nomenclature.model';

import { Color } from 'src/app/core-nomenclature/_interfaces/color.model';
import { Brand } from 'src/app/core-nomenclature/_interfaces/brand.model';
import { Article } from 'src/app/core-nomenclature/_interfaces/article.model';
import { KatalogN } from 'src/app/core-nomenclature/_interfaces/katalog-n.model';




@Injectable({
  providedIn: ManagerServiceModule
})
export class NomenclatureService {

  constructor(
    private _http: HttpClient,
    private _token: TokenService,
    private _url: RouteApiService,


  ) { }

  /** http_x01,http_xf01 Postavchik + Katalog get Nomenclature*/
  public NomenclaturePKs = (idKatlaog: number): Observable<Nomenclature[]> => {
    this._url.Controller = 'Nomenclature';
    this._url.Action = 'NomenclaturePKs';
    this._url.ID = idKatlaog;


    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
    //-- x_01
    let params_x01: HttpParams = new HttpParams().set('postavchikId', this._url.Postavchik_X01_Id)

    const http_x01_Options = { headers, params: params_x01 }


    const http_x01 = this._http.get<Nomenclature[]>(this._url.Url, http_x01_Options).pipe(
      map((data: any) => {
        //  console.log(JSON.stringify(data))
        return data.map((f: any) => {
          return <Nomenclature>{
            id: f.id,
            articleId: f.articleId,
            brandId: f.brandId,
            colorId: f.colorId,
            description: f.description,
            guid: f.guid,
            hidden: f.hidden,
            inStock: f.inStock,
            sale: f.sale,
            katalogId: f.katalogId,
            markup: f.markup,
            postavchikId: f.postavchikId,
            name: f.name,
            position: f.position,
            price: f.price,

            wwwroot: this._url.WWWroot,
          };
        });
      })
    );
    //-- xf_01
    let params_xf01: HttpParams = new HttpParams().set('postavchikId', this._url.Postavchik_XF01_Id)

    const http_xf01_Options = { headers, params: params_xf01 }


    const http_xf01 = this._http.get<Nomenclature[]>(this._url.Url, http_xf01_Options).pipe(
      map((data: any) => {
        //  console.log(JSON.stringify(data))
        return data.map((f: any) => {
          return <Nomenclature>{
            id: f.id,
            articleId: f.articleId,
            brandId: f.brandId,
            colorId: f.colorId,
            description: f.description,
            guid: f.guid,
            hidden: f.hidden,
            inStock: f.inStock,
            sale: f.sale,
            katalogId: f.katalogId,
            markup: f.markup,
            postavchikId: f.postavchikId,
            name: f.name,
            position: f.position,
            price: f.price,

            wwwroot: this._url.WWWroot,
          };
        });
      })
    );

    return forkJoin([http_x01, http_xf01]).pipe(
      map((d) => {
        let x01: Nomenclature[] = d[0];
        let xf01: Nomenclature[] = d[1];


        return xf01.concat(xf01);
      }
      )
    )

  };


  public Nomenclature = (idNomenclature: number): Observable<Nomenclature> => {
    this._url.Controller = 'Nomenclature';
    this._url.Action = 'Item';
    this._url.ID = idNomenclature;


    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + token,
    });
    // let params:HttpParams=new HttpParams().set('postavchikId',this._url.PostavchikId)

    const httpOptions = { headers }

    const http_nomenclature = this._http.get<Nomenclature>(this._url.Url, httpOptions);


    return http_nomenclature.pipe(
      switchMap(
        (d: Nomenclature) => {

          this._url.Controller = 'BrandN';
          this._url.Action = 'Item';
          this._url.ID = d.brandId;
          const http_brand = this._http.get<Brand>(this._url.Url, { headers });

          this._url.Controller = 'ColorN';
          this._url.Action = 'Item';
          this._url.ID = d.colorId;
          const http_color = this._http.get<Color>(this._url.Url, { headers });

          this._url.Controller = 'ArticleN';
          this._url.Action = 'Item';
          this._url.ID = d.articleId;
          const http_article = this._http.get<Article>(this._url.Url, { headers })
          return forkJoin([of(d),
            http_brand,
            http_color,
            http_article,
          ]).pipe(
            map((data: any[]) => {
              let f = data[0];

              let itemBrand:Brand = data[1];
              let itemColor:Color = data[2];
              let itemArticle:Article = data[3];


                //  console.log(JSON.stringify(data))
                let n = <Nomenclature>{
                  id: f.id,
                  articleId: f.articleId,

                  articleName: itemArticle.name,
                  brandName: itemBrand.name,
                  colorId: f.colorId,
                  colorName: itemColor.name,
                  description: f.description,
                  guid: f.guid,
                  hidden: f.hidden,
                  inStock: f.inStock,
                  sale: f.sale,
                  katalogId: f.katalogId,
                  // katalogName:this.sharedVar.
                  markup: f.markup,
                  postavchikId: f.postavchikId,
                  name: f.name,
                  position: f.position,
                  price: f.price,

                  wwwroot: this._url.WWWroot,


              }
            //  console.log('JSON.stringify(f)-- get nomencl item --')
             // console.log(JSON.stringify(n))
              return n;
            })
          );
        }
      )


    );


    
  };

  ///  for: nomenclatureItem  ___________________

  public ArticleNs = (): Observable<Article[]> => {
    this._url.Controller = 'ArticleN';
    this._url.Action = 'getPostavchik';
    this._url.ID = this._url.Postavchik_X01_Id;

    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + this._token.AccessToken,
    });


    return this._http.get<Article[]>(this._url.Url, { headers });
  };


  public BrandNs = (): Observable<Brand[]> => {
    this._url.Controller = 'BrandN';
    this._url.Action = 'getPostavchik';
    this._url.ID = this._url.Postavchik_X01_Id;
    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      //  Authorization: 'Bearer ' + this._token.AccessToken,
    });


    return this._http.get<Brand[]>(this._url.Url, { headers });
  };

  public ColorNs = (): Observable<Color[]> => {
    this._url.Controller = 'ColorN';
    this._url.Action = 'getPostavchik';
    this._url.ID = this._url.Postavchik_X01_Id;

    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      // Authorization: 'Bearer ' + this._token.AccessToken,
    });


    return this._http.get<Color[]>(this._url.Url, { headers });
  };


  public KatalogN = (idKatalog: number): Observable<KatalogN> => {
    this._url.Controller = 'KatalogN';
    this._url.Action = 'Item';
    this._url.ID = idKatalog;


    let headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this._token.AccessToken,
    });


    return this._http.get<KatalogN>(this._url.Url, { headers });

  }

}
