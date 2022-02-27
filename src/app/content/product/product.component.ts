import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductDataService } from '../shared/sevices/product.servisce';
import { Product } from '../../shared/_interfaces/product.model';
import { Meta, Title } from '@angular/platform-browser';
import {SharedVarService} from 'src/app/shared/sevices/shared-var.service'

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
  _url_img: string = '';

  _decriptSEO:string=''
  _keywordsSEO:string=''


  constructor(
    private _repository: ProductDataService,
    private route: ActivatedRoute,
    private meta: Meta,
    private titleMeta: Title,
    private sharedVar:SharedVarService
  ) {}

  public ngOnInit(): void {



   // this._url_img = this._repository.RootImg;
    const katalogId: string | null = this.route.snapshot.paramMap.get('id');
    const id: number = Number(katalogId) || 0;
    this.route.queryParams.subscribe((queryParam: any) => {
      this._katalogName = queryParam['katalog'];
    });
    //  this._katalogName = '';

    this.Load(id,this._katalogName);
    this.titleMeta.setTitle(this._katalogName);

    // let d=''
    // if(decript.length){
    //   decript.toString();

    // }
    this.meta.updateTag({name: "description", content:this._decriptSEO})
    this.meta.updateTag({name: "keywords", content: this._keywordsSEO})
    console.log('katalogs------' + this._katalogName);
  }

  // загрузить данные подКаталога по id
  private Load(idKatalog: number,katalogName:string): void {
    this._repository.Products(idKatalog,katalogName).subscribe(
      (d) => {
        this._products = d;
        this.LoadSEO(this._products);
      },
      (err) => {
        console.log(err);
      }
    ); //13.03.21
  }
  //--------------------
  private LoadSEO(products:Product[])
  {
    let decript:string[]=[];
    let keywords:string[]=[];
    debugger
    if(products){

      products.forEach(
        d=>{
         decript.push(d.name.split("").toString());
         keywords.push(d.name)
        }
      )
    }
    this._decriptSEO=decript.toString();
    this._keywordsSEO=keywords.toString();
  //  console.log(this._decriptSEO);

  }
}
