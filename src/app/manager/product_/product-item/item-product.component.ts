import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/shared/_interfaces/product.model';
import { TypeProduct } from 'src/app/shared/_interfaces/product-type.model';
import { Katalog } from 'src/app/shared/_interfaces/katalog.model';

@Component({
  selector: 'app-item-product',
  templateUrl: './item-product.component.html',
  styleUrls: ['./item-product.component.scss'],
})
export class ItemProductComponent implements OnInit {

  @Input() public _select_Product: Product;
  @Input() public _typeProducts: TypeProduct[] = [];
  @Input() public _select_katalog:Katalog|undefined;

  public _flag_sendServerData: boolean = false;
  public _select_typeProduct: TypeProduct = <TypeProduct>{ id: -1, name: '' };

  public _flagInvalid: boolean = false;

  public _progress: number = 0;

  constructor() {
    this._select_Product = <Product>{
      id: -1,
      katalogId: -1,
      typeProductId: -1,
      description: '',
      name: '',
      imgName: '',
      markup: 20,
      price: -1,
    };
    if(this._select_katalog){
      this._select_Product.katalogId=this._select_katalog.id;
      this._select_Product.katalogName=this._select_katalog.name;
    }
  }

  ngOnInit(): void {}

  public onEditFormChange() {}

  public changeTypeProduct(item: TypeProduct) {}

  public onSetFilePhoto(event: any) {}

  public saveProduct() {}

  public deleteProduct() {}
  public cancel() {}

  public undo() {}
}
