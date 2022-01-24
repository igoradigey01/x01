import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/_interfaces/product.model';
import { EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {

  @Input() public _products: Product[] = [];
// @Input() public _root_url_img: string = '';
  @Output() public _onChangeRow=new EventEmitter<Product>()

  constructor() {}

  ngOnInit(): void {}

  public changeProduct(product: Product) {
  //  console.log(" changeProduct(product: Product-)"+product.name+"||imgName--"+ product.rootImgSrc+ "|"  +product.imgName);
    this._onChangeRow.emit(product);

  }
}
