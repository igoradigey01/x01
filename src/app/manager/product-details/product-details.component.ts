import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import {
  CorpImgFile,
  Image,
  ItemProduct,
  Katalog,
  Product,
} from 'src/app/data-model/class-data.model';
import { ProductDetailsDataService } from 'src/app/data-model/product-details-data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  _flagDisplayAddImgButton: boolean = false;

  //-- begin katalog panel pole
  _flagPanel1: boolean = true;
  _flagPanel2: boolean = false;
  _flagKatalogHiden = false;

  _katalogs: Katalog[];
  _selectedKagalog: Katalog = new Katalog(-1, '');
  // --end katalog panel pole

  //---- product panel pole begin

  _selectedItemProduct: ItemProduct = new ItemProduct(
    new Product(-1, '', 0, -1, -1, -1, '', null),
    [new Image(-1, 'not_found.png', -1)],
    null
  );
  _products: Product[] = [new Product(-1, '', 0, -1, -1, -1, '', null)];

  //-- product panel pole end

  //_selectedItemProduct: Product=new Product();
  //--------- begin Carousel pole ------
  // _images: Image[] = [new Image(-1, '', -1)];  17.05.21

  _notFoundImage: Image = new Image(-1, 'not_found.png', -1);
  _currentImage: Image;
  _currentIndex: number = 0;
  _flagCarouselHiden: boolean = false;

  // --- end Carousel pole
  _errorUotput: boolean = false;
  _error: any;
  _imgInvalid: boolean = true;
  _flagViewMode: string = 'default'; // табличный режим

  //------  load img from file ---

  _previewUrl: any = null;
  _flagPhoto: boolean = false;
  _flagButton: boolean = true;
  _selectedCropImage: string = '';
  _flag_ng_template: boolean = false;
  _flag_crop_upload_files: boolean = false;
  _flag_sendServerData: boolean = true;
  _progress: number = 0;
  //-----------------------------
  _url_img = this._repository.GetUrlImg;

  constructor(
    private _repository: ProductDetailsDataService,
    private _activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._repository.GetKatalogs().subscribe((d) => (this._katalogs = d));

    /* 25.04.20.21
    this._idProduct = parseInt(this._activateRoute.snapshot.params['id']);
    this._nameProduct=this._activateRoute.snapshot.params['name'];
    */
  }
  // carousel medod
  Prev() {
    this._error = '';
    // console.log("Click Prev button");
    //  this._currentImage=this._images[1];
    --this._currentIndex;

    if (this._currentIndex >= 0) {
      this._currentImage = this._selectedItemProduct.image[this._currentIndex];
    } else {
      this._currentIndex = this._selectedItemProduct.image.length - 1;
      this._currentImage = this._selectedItemProduct.image[this._currentIndex];
    }
    // console.log("Click Prev button---index--"+this._currentIndex);
  }
  // carousel medod
  Next() {
    this._error = '';
    ++this._currentIndex;

    if (this._currentIndex < this._selectedItemProduct.image.length) {
      this._currentImage = this._selectedItemProduct.image[this._currentIndex];
    } else {
      this._currentIndex = 0;
      this._currentImage = this._selectedItemProduct.image[this._currentIndex];
    }
    // console.log("Click Next button---index--"+this._currentIndex);
  }
  // left katalog panel medod
  ViwePanel() {
    this._flagPanel1 = !this._flagPanel1;
    this._flagPanel2 = !this._flagPanel2;
    this._flagKatalogHiden = !this._flagKatalogHiden;
  }

  addImg() {
    if (this._flagViewMode === 'edit') {
      //  this. _selectedCropImage.productId = this._selectedItemProduct.product.id;
      if (this._selectedCropImage == '' || this._selectedCropImage == null) {
        this._error = 'Фото невыбрано!!';
        return;
      }
      //  this._selectedImage.photo = this._imgBase64;
      this._errorUotput = true;
    }
    this._flag_sendServerData = false; //23.05.21

    let img: Image = new Image(
      -1,
      'temp.png',
      this._selectedItemProduct.product.id,
      this._selectedCropImage
    );
    this._progress = 0;
    this._repository.AddImage(img).subscribe(
      (data: HttpEvent<Image>) => {
        switch (data.type) {
          case HttpEventType.Sent:
            // console.log('Sent-- запрос отправлен--CreateProduct--'); // запрос отправлен
            break;
          case HttpEventType.UploadProgress:
            // do something
            this._progress = Math.round((100 * data.loaded) / data.total);
            //  console.log('HttpEventType.UploadProgress--' + this._progress);
            break;
          case HttpEventType.Response:
            //  console.log('Finished');
            // do someting -- response ok---
            let d = data.body as Image;
            // console.log('cteateProuct metod-- d.name--' + d.name);
            this._selectedItemProduct.image.push(d);
            this._error = '';

            this._errorUotput = false;
            //  this.cancel(); //15.03.21
            this._flag_crop_upload_files = true;
            this._flagPhoto = false;
            this._flag_sendServerData = true; //23.05.21
            this._flag_ng_template = true;
            this._progress = 0;
            break;
        }
      },
      (err) => {
        this._error = err.error;
        console.log(err);
        this._errorUotput = true;
      }
    );
  }

  deleteImg() {
    // throwError('not impliment exeption');
    if (this._currentImage.id == -1) {
      let err = 'Выбранное Фото Можно изменить только в admin-меню-(товар)';
      this._error = err;
      console.log(err);
      this._errorUotput = true;
      return;
    }
    this._repository.DeleteImage(this._currentImage.id).subscribe(
      (d) => {
        let index = this._selectedItemProduct.image.findIndex((d) => {
          d.id == this._currentImage.id;
        });
        if (index !== -1) {
          this._selectedItemProduct.image =
            this._selectedItemProduct.image.slice(index, 1);
        }
      },
      (err) => {
        this._error = err.error;
        console.log(err);
        this._errorUotput = true;
      }
    );
    // console.log('curint_image-id--'+this._currentImage.id);
  }

  cancel() {
    this._flagViewMode = 'default';
    // this._products=null;//25.04.21
    this._selectedItemProduct = null; //25.04.21
    this._flag_sendServerData = true; //23.05.21
    this._error = '';

    // this._images = null; //25.04.21
    this._currentImage = null;
    this._currentIndex = 0;
    this._selectedCropImage = null; //5.05.21

    //this._dataFile=null;   19.12.20       ------------&&&????
    this._flagPhoto = false;
    this._imgInvalid = true;
    // console.log("-currentImage is null--"+this._currentImage);
    // this.IsVisible(); // 18.05.21
  }

  undo() {
    this._flag_sendServerData = true;
    this._error = '';
  }

  // колекция фото продукта []

  changeKagalog(item?: Katalog) {
    this._selectedKagalog = item;
    // this._flagDisplayAddButton = true;
    // this._repository.GetModel(item.id).subscribe((d) => (this._models = d));
    this.GetProducts(item.id);
  }

  changeItemProduct(item?: Product) {
    this._selectedItemProduct = new ItemProduct(
      item,
      [new Image(-1, item.image, item.id)],
      null
    );
    this._flag_crop_upload_files = true;
    // this._currentImage=this._notFoundImage;
    this._flag_ng_template = true;
    // this._selectedProduct = item;

    this.GetImages(item.id, this._selectedItemProduct);
    this._currentImage = this._selectedItemProduct.image[0];
    this._selectedCropImage = '';
    this._flagViewMode = 'edit';
    // this._flagPhoto = true;
    this._flag_ng_template = true;
    //  this.IsVisible();
  }

  // Carousel metod
  changeImg(i: number) {
    this._error = '';
    this._currentIndex = i;
    this._currentImage = this._selectedItemProduct.image[this._currentIndex];
    console.log('UpdateImgs()--_currentIndex--' + this._currentIndex);
  }
  // crarousel isVisible показать скрыть если нет Photo
  Visible() {
    if (
      this._currentImage == null ||
      this._currentImage.id == this._notFoundImage.id
    ) {
      console.log('IsVisible()-- currentImage==null');
      this._currentImage = this._notFoundImage;
      this._currentIndex = 0;

      this._flagCarouselHiden = true;
    } else this._flagCarouselHiden = false;
  }

  // загрузить данные подКаталога по id
  GetProducts(idKatalog: number) {
    this._repository.GetProducts(idKatalog).subscribe(
      (d) => {
        this._products = d;
        this._error = '';
        this._errorUotput = false;
      },
      (err) => {
        this._error = err.error;
        console.log(err);
        this._errorUotput = true;
      }
    ); //13.03.21
  }

  // init in crop-upload-files.  -----  this.getImg.emit(this._cropImgPreview);
  onSetFilePhoto(event: CorpImgFile) {
    //---------begin 17.05
    if (!event.flag) {
      this._flagButton = false;
      this._flagPhoto = false;
      this._flag_ng_template = false;
      this._selectedCropImage = ''; //20.05

      console.log(
        'onSetFilePhoto- flag flase -event.fileBase64' + event.fileBase64
      );
    } else {
      // console.log( 'onSetFilePhoto- flag true -event.fileBase64--' + event.fileBase64  );

      // event генерируется в дочернем компоненте (задается тип и значение переменной)
      this._selectedCropImage = event.fileBase64; //this._imgBase64 = event;
      //this. _selectedCropImage.name = 'temp.png';
      this._flagPhoto = true;
      this._flag_crop_upload_files = false;

      this._flagButton = true;
      if (this._selectedCropImage.length > 0) {
        this._errorUotput = false;
        //  this._flagInvalid = false;
        this._imgInvalid = false;
      }
    }
    //-----end 17.05
  }

  private GetImages(idProduct: number, item: ItemProduct) {
    this._repository.GetImages(idProduct).subscribe(
      (d) => {
        if (d.length > 0) {
          d.forEach((i: Image) => {
            item.image.push(i);
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
  // Blog flile object-----
  private getBlobImg(name: string) {
    this._repository.GetBlobIMG(name).subscribe((d) => {
      this.createImageFromBlob(d);
    });
  }
  private createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this._selectedCropImage = reader.result as string;
      },
      false
    );
    if (image) {
      reader.readAsDataURL(image);
    }
    console.log('----------------------------cBlob -------------------');
  }
}
