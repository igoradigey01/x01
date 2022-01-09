import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/_interfaces/product.model';
import { EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {

  @Input() public _products: Product[] = [];
  @Input() public _root_url_img: string = '';
  @Output() public _onChangeRow=new EventEmitter<Product>()
  constructor() {}

  ngOnInit(): void {}
  public changeProduct(product: Product) {
    console.log(" changeProduct(product: Product)"+product.name);
    this._onChangeRow.emit(product);

  }
}
