import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,NavigationStart , Router } from '@angular/router';
import { ImageDelatil } from 'src/app/shared/_interfaces/image-delatil.model';
import { ProductDetail } from 'src/app/shared/_interfaces/product-deatil.model';
import { Nomenclature } from 'src/app/shared/_interfaces/nomenclature.model';
import { Product } from 'src/app/shared/_interfaces/product.model';
import { ProductDetailsDataService } from '../shared/sevices/product-details-data.service';


@Component({
  selector: 'app-product-details.',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],

})
//------------User view item-product
export class ProductDetailsComponent implements OnInit {
  _errorUotput: boolean = false;
  _error: any;

   defaultProduct:Product=<Product>{ id: -1, name: '', katalogId: -1, typeProductId: -1, description: '', image: '', markup: 0, imageBase64: '', photo: null, price: -1 };
  selectedDetailProduct: ProductDetail = <ProductDetail>{
    image: [{ id: -1, name: '', productId: -1, imageBase64: '' },],
    product:this.defaultProduct ,
    //nomenclature:
  }

  // _images: Image[] = [new Image(-1, 'not_found.png', -1)];
  _currentImage: ImageDelatil = <ImageDelatil>{ id: -1, name: 'not_found.png', productId: -1 };
  _notFoundImage: ImageDelatil = <ImageDelatil>{ id: -1, name: 'not_found.png', productId: -1 };
  _currentIndex: number = 0;
  _flagCarouselHiden: boolean = false;
  _url_img = "";



  constructor(
    private repository: ProductDetailsDataService,
    private router:Router
  ) {
   // console.log(this.router.getCurrentNavigation()?.extras.state);
   let product=this.router.getCurrentNavigation()?.extras.state as Product;
   if(product){
   this.selectedDetailProduct.product=product;
   }else{
    this.selectedDetailProduct.product=this.defaultProduct;

   }
  }

  ngOnInit(): void {

   /*  this.activatedRoute.data.subscribe(data => {
      this.selectedDetailProduct.product= data as Product;
  }) */

    this._url_img = this.repository.RootUrlImg;

       this.Load(this.selectedDetailProduct);

  }
  Prev() {
    // console.log("Click Prev button");
    //  this._currentImage=this._images[1];
    --this._currentIndex;
    if (this.selectedDetailProduct.image) {
      if (this._currentIndex >= 0) {

        this._currentImage = this.selectedDetailProduct.image[this._currentIndex];
      } else {
        this._currentIndex = this.selectedDetailProduct.image.length - 1;
        this._currentImage = this.selectedDetailProduct.image[this._currentIndex];
      }
    }
    // console.log("Click Prev button---index--"+this._currentIndex);
  }
  // carousel medod
  Next() {
    ++this._currentIndex;
    if (this.selectedDetailProduct.image) { //21.10.21

      if (this._currentIndex < this.selectedDetailProduct.image.length) {
        this._currentImage = this.selectedDetailProduct.image[this._currentIndex];
      } else {
        this._currentIndex = 0;
        this._currentImage = this.selectedDetailProduct.image[this._currentIndex];
      }
    }
    // console.log("Click Next button---index--"+this._currentIndex);
  }
  // left katalog panel medod
  changeImg(i: number) {

    this._currentIndex = i;
    if (this.selectedDetailProduct.image)
      this._currentImage = this.selectedDetailProduct.image[this._currentIndex];
    console.log('UpdateImgs()--_currentIndex--' + this._currentIndex);
  }
  // crarousel isVisible показать скрыть если нет Photo


  private Load(item:ProductDetail):void {
    if (item.image?.length) {

      this.repository.GetImages(item.product.id).subscribe(
        (d) => {
          if (d.length > 0) {
          //  let arr=new Array();

            d.forEach((i: ImageDelatil) => {
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
