import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/sevices/product.servisce';
import { Katalog } from 'src/app/shared/_interfaces/katalog.model';
import { StateView } from 'src/app/shared/_interfaces/state-view';
import { Product } from 'src/app/shared/_interfaces/product.model';
import {TypeProduct}  from 'src/app/shared/_interfaces/product-type.model';

@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.scss'],
})
export class ProductMainComponent implements OnInit {
  public _katalogs: Katalog[] | null = null;
  public _selectKatalog: Katalog = <Katalog>{ id: -1, name: '' };
  public _modul_name: string = '(менеджер)';
  public _router_link: string = '/manager';
  public _flagViewMode: StateView = StateView.default;
  //--------------------------
  public _products: Product[] = [];
  public _typeProducts:TypeProduct[]=[];
  public _root_url_img: string = '';
  public _select_Product: Product;

  constructor(private _repository: ProductService) {
    this._select_Product = <Product>{
      id: -1,
      katalogId: -1,
      katalogName:'',
      typeProductId: -1,
      description: '',
      name: '',
      image: '',
      markup: 20,
      price: -1,
    };
  }

  ngOnInit(): void {
    this._repository.Katalogs().subscribe((data) => {
      this._katalogs = data;
    });
    this._repository.TypeProducts().subscribe(
      (data)=>{
        this._typeProducts=data;
      }
    )
  }
  public onChangedViewMode(event: StateView) {
    this._flagViewMode = event;
  }

  public onChangedKatalog(event: Katalog) {
    this._flagViewMode = StateView.default;
    this._selectKatalog = event;
    this._repository.Products(this._selectKatalog.id).subscribe((data) => {
      this._products = data;
    });
  }

  public onChangeRow(event: Product) {
    this._select_Product = event;

    if(this._selectKatalog.id==this._select_Product.katalogId){
    this._select_Product.katalogName=this._selectKatalog.name;
    this._select_Product.rootSrc=this._repository.RootSrcImg;
    }
    else{
      throw new Error('this._selectKatalog.id!=this._select_Product.katalogId')
     // console.log('onChangeRow--' + event.name);
    }
    let item= this._typeProducts.find( x=>x.id==this._select_Product.typeProductId );
    this._select_Product.typeProductName=item?.name;
    this._flagViewMode = StateView.edit;

  }
}
