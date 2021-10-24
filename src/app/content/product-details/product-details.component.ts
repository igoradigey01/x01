import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image} from 'src/app/shared/_interfaces/image.model';
import {  ItemProduct} from 'src/app/shared/_interfaces/item-product.model';
import { Material } from 'src/app/shared/_interfaces/material.model';
 import { Product} from 'src/app/shared/_interfaces/product.model';
import { ProductDetailsDataService } from '../shared/sevices/product-details-data.service';
//import { environment } from './../../../assets/images' ;

@Component({
  selector: 'app-product-details.',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [ProductDetailsDataService],
})
//------------User view item-product
export class ProductDetailsComponent implements OnInit {
  _errorUotput: boolean = false;
  _error: any;

  /* _selectedItemProduct: ItemProduct = {new ItemProduct(}
    new Product(-1, '', 0, -1, -1, -1, '', null),
    [new Image(-1, 'not_found.png', -1)],
    null
  ); */
  _selectedItemProduct: ItemProduct = <ItemProduct>{
    image:[{id:-1,name:'',productId:-1,imageBase64:''},],
    product:<Product>{id:-1,name:'',katalogId:-1,typeProductId:-1, description:'',image:'',markup:0,imageBase64:'',photo:null,price:-1},
    //nomenclature:
    }

 // _images: Image[] = [new Image(-1, 'not_found.png', -1)];
  _currentImage: Image= <Image>{id:-1,name: 'not_found.png',productId: -1};
  _notFoundImage: Image = <Image>{id:-1,name: 'not_found.png',productId: -1};
  _currentIndex: number = 0;
  _flagCarouselHiden: boolean = false;
  _url_img = "";



  constructor(
    private _repository: ProductDetailsDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    /* this.route.paramMap.subscribe((params) => {
      let i: number = Number.parseInt(params.get('productId'));
      this._repository
        .GetItemProducts(i)
        .subscribe((d) => {
          this._selectedItemProduct.product = d;
          this._selectedItemProduct.image[0].name=d.image; //задать первому элементу [] name фото parent-( product)
          this.GetImages(this._selectedItemProduct.product.id,this._selectedItemProduct);
          this._currentImage = this._selectedItemProduct.image[0];
        });
    }); */

  }
  Prev() {
    // console.log("Click Prev button");
    //  this._currentImage=this._images[1];
    --this._currentIndex;
    if(this._selectedItemProduct.image){
    if (this._currentIndex >= 0) {

      this._currentImage = this._selectedItemProduct.image[this._currentIndex];
    } else {
      this._currentIndex = this._selectedItemProduct.image.length - 1;
      this._currentImage = this._selectedItemProduct.image[this._currentIndex];
    }
  }
    // console.log("Click Prev button---index--"+this._currentIndex);
  }
  // carousel medod
  Next() {
    ++this._currentIndex;
    if(this._selectedItemProduct.image){ //21.10.21

    if (this._currentIndex < this._selectedItemProduct.image.length) {
      this._currentImage = this._selectedItemProduct.image[this._currentIndex];
    } else {
      this._currentIndex = 0;
      this._currentImage = this._selectedItemProduct.image[this._currentIndex];
    }
  }
    // console.log("Click Next button---index--"+this._currentIndex);
  }
  // left katalog panel medod
  changeImg(i: number) {

    this._currentIndex = i;
    if(this._selectedItemProduct.image)
    this._currentImage = this._selectedItemProduct.image[this._currentIndex];
    console.log('UpdateImgs()--_currentIndex--' + this._currentIndex);
  }
  // crarousel isVisible показать скрыть если нет Photo

  private GetImages(idProduct: number, item: ItemProduct) {
    if(item.image?.length ){
    this._repository.GetImages(idProduct).subscribe(
      (d) => {
        if (d.length > 0) {
          d.forEach((i: Image) => {
            item.image?.push(i);
          });
          // item.image = d;
          //  if(d.length>0)
        }
      },
      (err) => {
        this._error = err.error;
        console.log(err);
        this._errorUotput = true;
      }
    );
  }
}
}
