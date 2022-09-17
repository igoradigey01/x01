import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductDataService } from '../shared/sevices/product.servisce';
import { Product } from '../../shared/_interfaces/product.model';
import { Meta, Title } from '@angular/platform-browser';
import { SharedVarService } from 'src/app/shared/services/shared-var.service';
import { SEO_var } from 'src/app/shared/_interfaces/SEO-var.models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  // providers: [ProductDataService],
})
export class ProductComponent implements OnInit {
  _errorUotput: boolean = false;
  _error: any;
  _products: Product[] | null = null; //
  _katalogName: string = '';
 // _url_img: string = '';

//  _decriptSEO: string = '';
  //_keywordsSEO: string = '';

  constructor(
    private _repository: ProductDataService,
    private route: ActivatedRoute,
    private meta: Meta,
    private titleMeta: Title,
    private sharedVar: SharedVarService
  ) {}

  public ngOnInit(): void {
    // this._url_img = this._repository.RootImg;
    const katalogId: string | null = this.route.snapshot.paramMap.get('id');
    const id: number = Number(katalogId) || 0;
    this.route.queryParams.subscribe((queryParam: any) => {
      this._katalogName = queryParam['katalog'];
    });

    if (this.sharedVar.SEO_let) this.LoadSEO(this.sharedVar.SEO_let, id);

    this.Load(id, this._katalogName);
    this.titleMeta.setTitle(this._katalogName);

    // let d=''
    // if(decript.length){
    //   decript.toString();

    // }

    console.log('katalogs------' + this._katalogName);
  }

  // загрузить данные подКаталога по id
  private Load(idKatalog: number, katalogName: string): void {
    
    this._repository.Products(idKatalog, katalogName).subscribe(
      (d) => {
        this._products = d;
        console.log(JSON.stringify(d));
      },
      (err) => {
        console.error(err);
      }
    ); //13.03.21
  }
  //--------------------
  private LoadSEO(item: SEO_var, idKatalog: number) {
    if (item.id || item.id == idKatalog)
      if (item.decriptSEO){
        this.meta.updateTag({ name: 'description', content: item.decriptSEO });
      }
    if (item.keywordsSEO){

      this.meta.updateTag({ name: 'keywords', content: item.keywordsSEO});
    }



    //  console.log(this._decriptSEO);
  }
}
