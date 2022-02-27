import { Component, OnInit, ViewChild } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/_interfaces/product.model';
import { TypeProduct } from 'src/app/shared/_interfaces/product-type.model';
import { Katalog } from 'src/app/shared/_interfaces/katalog.model';
import { DtoImage } from 'src/app/ui/img-render/img-render.component';
import { ImgRenderComponent } from 'src/app/ui/img-render/img-render.component';
import { ProductService } from '../../shared/sevices/product.servisce';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { StateView } from 'src/app/shared/_interfaces/state-view';
import { ImgManagerService } from 'src/app/shared/sevices/img-manager.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface DtoProduct {
  product: Product;
  flagViewMode: StateView;
}

@Component({
  selector: 'app-item-product',
  templateUrl: './item-product.component.html',
  styleUrls: ['./item-product.component.scss'],
})
export class ItemProductComponent implements OnInit {
  @Input() public _select_Product: Product;
  @Input() public _typeProducts: TypeProduct[] = [];
  @Input() public _select_katalog: Katalog | undefined;
  @Input() public _flagViewMode: StateView | undefined;

  @Output() public _onShowTableView = new EventEmitter<StateView>();
  @Output() public _onProductChange = new EventEmitter<DtoProduct>();

  @ViewChild(ImgRenderComponent, { static: false })
  private _childComponent: ImgRenderComponent | undefined;

  public _flag_sendServerData: boolean = false;
  public _select_typeProduct: TypeProduct = <TypeProduct>{ id: -1, name: '' };

  public _flagInvalid: boolean = false;

  public _progress: number = 0;

  public _selectDtoImg: DtoImage = <DtoImage>{
    base64Img: '',
    flagChanged: false,
  };
  public _flagButtonShow: boolean = false;
  public _flagError: boolean = false;
  _errorMgs: string[] = [];

  public _showPrefix = true;

  public get IsCreateView(): boolean {
    return this._flagViewMode == StateView.create ? false : true;
  }

  constructor(
    private _repository: ProductService,
    private _imgManager: ImgManagerService
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
    // debugger
    if (this._select_katalog) {
      this._select_Product.katalogId = this._select_katalog.id;
      this._select_Product.katalogName = this._select_katalog.name;
    }
  }

  public get ShowPrefix(): boolean {
    if (this._select_Product.katalogName) {
      if (
        this._select_Product.name.search(this._select_Product.katalogName) != -1
      )
        return true;
      else return false;
    }

    return false;
  }

  public onChangedDtoImage(event: DtoImage): void {
    this._selectDtoImg = event;
  }

  public onFlagButtonPanel(event: boolean): void {
    // debugger
    this._flagButtonShow = !event;
  }

  public saveOnlyImgFromProduct(): void {
    //debugger
    this._childComponent?.getDtoImgObgect();
    this._errorMgs=[];
    if (!this._selectDtoImg.flagChanged && this._flagViewMode==StateView.edit) {
      this._errorMgs.push( 'Файл Фото не изменился');
      this._flagInvalid = true;
      return;
    }

    this._select_Product.imageWebp = this._imgManager.convererFromImgBase64Url(
      this._selectDtoImg.base64Img
    );

    if (this._imgManager.FlagError) {
      this._errorMgs.push( this._imgManager.ErrorMassages);
      //   this._flagInvalid = true;
      return;
    }
    console.log("img name--"+ this._select_Product.imgName);

    if (this._flagViewMode == StateView.edit) {
      // ---- start edit -------
      this._repository.UpdateOnlyImg(this._select_Product).subscribe(
        (data: HttpEvent<any>) => {
          //progress bar
          switch (data.type) {
            case HttpEventType.Sent:
              console.log('Sent-- запрос отправлен--UpdateProduct--'); // запрос отправлен
              break;
            case HttpEventType.UploadProgress:
              // do something
              if (data.total) {
                this._progress = Math.round((100 * data.loaded) / data.total);
                console.log('HttpEventType.UploadProgress--' + this._progress);
              }
              break;
            case HttpEventType.Response:
              console.log('---Finished-----');
              this._errorMgs =[];
              this._flagError = false;
              //03.02.22
              this._select_Product.onChangeWebp=true;
              this._onProductChange.emit(<DtoProduct>{
                product: this._select_Product,
                flagViewMode: this._flagViewMode,
              });
              //   window.location.replace(this._select_Product.rootImgSrc+'S'+this._select_Product.imgName+'.web');

              this.cancel(); //15.03.21
              break;
          }
          // end progrss bar
        },
        (err:HttpErrorResponse) => {
          this._flagError = true;
          //--  this._flag_sendServerData = false;
            this._flagInvalid = false;

            if(err.status === 401){
              this._errorMgs.push("пользователь не авторизован,войдите на сайт")
              return;
            }
            if ( err.status == 400) {
              console.log(err.error);
              if (err.error.errors)
                this._errorMgs.push(err.error.errors);
              else
                this._errorMgs.push(err.error);
              return;
            }

            this._errorMgs.push('Ошибка {'+err.status+ '} -Сообщиете Администаратору Pесурса');

        }
      );
      return;
      //--- end edit ---
    }


  }
  /** save only  property Product igonore <File> Blob */
  public saveIgnoreImgFromProduct(): void {

    this._errorMgs=[];
    if (this._select_Product.katalogId == -1) {
      this._flagInvalid = true;
      this._errorMgs.push( 'Каталог не задан');
      return;
    }
    //  debugger;

    if (this._flagViewMode == StateView.edit) {
      // ---- start edit -------
      this._repository.UpdateIgnoreImg(this._select_Product).subscribe(
        (data: HttpEvent<any>) => {
          //progress bar
          switch (data.type) {
            case HttpEventType.Sent:
              console.log(
                'Sent-- запрос отправлен--saveIgnoreImgFromProduct--'
              ); // запрос отправлен
              break;
            case HttpEventType.UploadProgress:
              // do something
              if (data.total) {
                this._progress = Math.round((100 * data.loaded) / data.total);
                console.log('HttpEventType.UploadProgress--' + this._progress);
              }
              break;
            case HttpEventType.Response:

              console.log('---Finished-----');
              this._errorMgs = [];
              this._flagError = false;
              //03.02.22

              this._onProductChange.emit(<DtoProduct>{
                product: this._select_Product,
                flagViewMode: this._flagViewMode,
              });
              this.cancel(); //15.03.21
              break;
          }
          // end progrss bar
        },
        (err:HttpErrorResponse) => {
          this._flagError = true;
          //--  this._flag_sendServerData = false;
            this._flagInvalid = false;
            if(err.status === 401){
              this._errorMgs.push("пользователь не авторизован,войдите на сайт")
              return;
            }
            if ( err.status == 400) {
              console.log(err.error);
              if (err.error.errors)
                this._errorMgs.push(err.error.errors);
              else
                this._errorMgs.push(err.error);
              return;
            }

            this._errorMgs.push('Ошибка {'+err.status+ '} -Сообщиете Администаратору Pесурса');

        }
      );
      return;
      //--- end edit ---
    }
  }

  /** Create  or Update all */
  public saveProduct(): void {

    this._flagInvalid = true;
    this._flag_sendServerData = true;
     // debugger
    this._errorMgs = [];
    if (this._select_Product.katalogId == -1) {
      // this._flagInvalid = true;
      this._errorMgs.push( 'Каталог Незадан');
      return;
    }
     /** -----init _selectDtoImg  get blob img from ImgRenderComponen---- */
    this._childComponent?.getDtoImgObgect();

    /**  'Файл Фото не изменился,' */
     if (!this._selectDtoImg.flagChanged && this._flagViewMode==StateView.edit) {
      this.saveIgnoreImgFromProduct();
      return;
    }

    /** ---- convert to blob img  --------- */
    this._select_Product.imageWebp = this._imgManager.convererFromImgBase64Url(
      this._selectDtoImg.base64Img
    );

    if (this._imgManager.FlagError) {
      this._errorMgs.push( this._imgManager.ErrorMassages);
      //   this._flagInvalid = true;
      return;
    }
    //   throw new  Error("Not impliment exeption!")
    //  debugger;
    if (this._flagViewMode == StateView.create) {
      // --- start create--
      this._repository.Create(this._select_Product).subscribe(
        (data: HttpEvent<any>) => {
          //progress bar
          switch (data.type) {
            case HttpEventType.Sent:
            //  console.log('Sent-- запрос отправлен--UpdateProduct--'); // запрос отправлен
              break;
            case HttpEventType.UploadProgress:
              // do something
              if (data.total) {
                this._progress = Math.round((100 * data.loaded) / data.total);
             //   console.log('HttpEventType.UploadProgress--' + this._progress);
              }
              break;
            case HttpEventType.Response:
            //  console.log('---Finished-----');
              this._errorMgs = [];
              this._flagError = false;

              this._select_Product.imgName=data.body.image // on server imgName ==Image

              this._onProductChange.emit(<DtoProduct>{
                product: this._select_Product,                           //,
                flagViewMode: this._flagViewMode,
              });

              this.cancel(); //15.03.21
              break;
          }
          // end progrss bar
        },
        (err:HttpErrorResponse) => {
          this._flagError = true;
      //--  this._flag_sendServerData = false;
        this._flagInvalid = false;
        if(err.status === 401){
          this._errorMgs.push("пользователь не авторизован,войдите на сайт")
          return;
        }
        if ( err.status == 400) {
          console.log(err.error);
          if (err.error.errors)
            this._errorMgs.push(err.error.errors);
          else
            this._errorMgs.push(err.error);
          return;
        }

        this._errorMgs.push('Ошибка {'+err.status+ '} -Сообщиете Администаратору Pесурса');

        }
      );

      return;
      //--- end create -------
    }
    if (this._flagViewMode == StateView.edit) {
      // ---- start edit -------
      this._repository.UpdateAll(this._select_Product).subscribe(
        (data: HttpEvent<any>) => {
          //progress bar
          switch (data.type) {
            case HttpEventType.Sent:
              console.log('Sent-- запрос отправлен--UpdateProduct--'); // запрос отправлен
              break;
            case HttpEventType.UploadProgress:
              // do something
              if (data.total) {
                this._progress = Math.round((100 * data.loaded) / data.total);
                console.log('HttpEventType.UploadProgress--' + this._progress);
              }
              break;
            case HttpEventType.Response:
              console.log('---Finished-----');
              this._errorMgs =[];
              this._flagError = false;
              //03.02.22
              this._select_Product.onChangeWebp=true;
              this._onProductChange.emit(<DtoProduct>{
                product: this._select_Product,
                flagViewMode: this._flagViewMode,
              });
              //   window.location.replace(this._select_Product.rootImgSrc+'S'+this._select_Product.imgName+'.web');

              this.cancel(); //15.03.21
              break;
          }
          // end progrss bar
        },
        (err:HttpErrorResponse) => {
          this._flagError = true;
          //--  this._flag_sendServerData = false;
            this._flagInvalid = false;

            if(err.status === 401){
              this._errorMgs.push("пользователь не авторизован,войдите на сайт")
              return;
            }
            if ( err.status == 400) {
              console.log(err.error);
              if (err.error.errors)
                this._errorMgs.push(err.error.errors);
              else
                this._errorMgs.push(err.error);
              return;
            }

            this._errorMgs.push('Ошибка {'+err.status+ '} -Сообщиете Администаратору Pесурса');

        }
      );
      return;
      //--- end edit ---
    }

    // this._flagInvalid = true; //!!!!
  }

  public deleteProduct() {
    this._flagInvalid = true;
    this._flag_sendServerData = true;
     // debugger
    this._errorMgs = [];
    this._flagError = false;

    this._repository.Delete(this._select_Product.id).subscribe(
      (data: HttpEvent<any>) => {
        //progress bar
        switch (data.type) {
          case HttpEventType.Sent:
            console.log('Sent-- запрос отправлен--UpdateProduct--'); // запрос отправлен
            break;

          case HttpEventType.Response:
            console.log('---Finished-----');


            this._onProductChange.emit(<DtoProduct>{
              product: this._select_Product,
              flagViewMode: StateView.delete,
            });

            this.cancel(); //15.03.21
            break;
        }
        // end progrss bar
      },
      (err : HttpErrorResponse) => {
       // debugger

        this._flagError = true;
      //--  this._flag_sendServerData = false;
        this._flagInvalid = false;
        if(err.status === 401){
          this._errorMgs.push("пользователь не авторизован,войдите на сайт")
          return;
        }

        if ( err.status == 400) {
          console.log(err.error);
          if (err.error.errors)
            this._errorMgs.push(err.error.errors);
          else
            this._errorMgs.push(err.error);
          return;
        }

        this._errorMgs.push('Ошибка {'+err.status+ '} -Сообщиете Администаратору Pесурса');
      }
    );

    return;

  }
  public cancel() {
    // debugger
    this._onShowTableView.emit(StateView.default);
  }

  public undo() {
    //debugger
    this._flag_sendServerData = false;
  }
}
