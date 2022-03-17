import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/sevices/product.servisce';
import { Katalog } from 'src/app/shared/_interfaces/katalog.model';
import { StateView } from 'src/app/shared/_interfaces/state-view';
import { Product } from 'src/app/shared/_interfaces/product.model';
import { Material } from 'src/app/shared/_interfaces/material.model';
import { ImgManagerService } from 'src/app/shared/services/img-manager.service';
import { DtoProduct } from '../product-item/item-product.component';


@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.scss'],
})
export class ProductMainComponent implements OnInit {
  public _katalogs: Katalog[] | null = null;
  public _select_Katalog: Katalog = <Katalog>{ id: -1, name: '' };
  public _modul_name: string = '(менеджер)';
  public _router_link: string = '/manager';
  public _flagViewMode: StateView = StateView.default;
  //--------------------------
  public _products: Product[] = [];
  public _typeProducts: Material[] = [];
  public _root_url_img: string = '';
  public _select_Product: Product;

  /** this new version product view */
  constructor(
    private _repository: ProductService,
    private _imgConverter: ImgManagerService
  ) {
    this._select_Product = <Product>{
      id: -1,
      katalogId: -1,
      katalogName: '',
      typeProductId: -1,
      description: '',
      name: '',
      imgName: '',
      markup: 20,
      price: -1,
    };
  }

  ngOnInit(): void {
    this._repository.Katalogs().subscribe((data) => {
      this._katalogs = data;
    });
    this._repository.Materials().subscribe((data) => {
      this._typeProducts = data;
    });
  }
  public onChangedProducts(event:DtoProduct){
    if(event.flagViewMode==StateView.create){
     // debugger
      this._products.push(event.product);
    }
    if(event.flagViewMode==StateView.delete)
    {
     let index= this._products.findIndex(f=>f.id==event.product.id);
      this._products.splice(index,index+1);
     // console.log(JSON.stringify( this._products));
    }
  }

  public onChangedViewMode(event: StateView) {
   // debugger
    this._flagViewMode = event;
    if (this._flagViewMode == StateView.create) {
      this._select_Product = <Product>{
        id: -1,
        katalogId: this._select_Katalog.id,
        katalogName: this._select_Katalog.name,
        typeProductId: -1,
        description: '',
        name: '',
        imgName: '',
        markup: 20,
        price: -1,
      };
    }
  }

  public onChangedKatalog(event: Katalog) {
    this._flagViewMode = StateView.default;
    this._select_Katalog = event;
    this._repository
      .Products(this._select_Katalog.id,this._select_Katalog.name)
      .subscribe((data) => {
        this._products = data;
       // console.log('onChangedKatalog');
       // console.log(JSON.stringify(data));
      });
  }

  public onChangeRow(event: Product) {
    this._select_Product = event;
  //  debugger

    if (this._select_Katalog.id == this._select_Product.katalogId) {
      this._select_Product.katalogName = this._select_Katalog.name;
      this._select_Product.rootImgSrc = this._repository.RootSrcImg;
    } else {
      throw new Error('this._selectKatalog.id!=this._select_Product.katalogId');
      // console.log('onChangeRow--' + event.name);
    }
    let item = this._typeProducts.find(
      (x) => x.id == this._select_Product.typeProductId
    );
    this._select_Product.typeProductName = item?.name;
    this._flagViewMode = StateView.edit;
  }
}
