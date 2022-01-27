import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/sevices/product.servisce';
import { Katalog } from 'src/app/shared/_interfaces/katalog.model';
import { Product } from 'src/app/shared/_interfaces/product.model';
import { TypeProduct } from 'src/app/shared/_interfaces/product-type.model';
import { CorpImgFile } from '../../shared/_interfaces/crop-img.model';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  // jwt statrt
  private readonly accessTokenName: string = 'access_token';
  // Получить
  GetJwt(): string|null {
    return localStorage.getItem(this.accessTokenName);
  }

  //jwt end--
   defaulImg={id:-1,name:'not_found.png'};
  _katalogs: Katalog[]|null=null;
  _typeProducts: TypeProduct[]|null=null;
  _error: any;
  _errorUotput: boolean = false; //09.04.21 (true)
  _flagInvalid: boolean = true;

  _products: Product[] = [<Product>{id:-1,name:'',katalogId:-1,typeProductId:-1}];                //[new Product(-1, '', -1, -1, -1, -1, '', null)];
  _flagPanel1: boolean = true;
  _flagPanel2: boolean = false;
  _flagKatalogHiden = false;
  _flagViewMode: string = 'default';
  _flagDisplayAddButton: boolean = false;

  _selectedKagalog: Katalog =  <Katalog>{id:-1,name:''}; //new Katalog(-1, '');
  _selectedTypeProduct: TypeProduct =<TypeProduct>{id:-1,name:''};         //new TypeProduct(-1, '', null);
  _selectedProduct: Product =  <Product>{id:-1,name:'',katalogId:-1,typeProductId:-1};          // new Product(-1, '', -1, -1, null, null, null);

  _flagPhoto: boolean = false;
  _flagButton: boolean = true;
  _flag_ng_template: boolean = false;
  _flag_sendServerData: boolean = true;
  _progress: number = 0;

  _url_img = this._repository.RootSrcImg;
  /** this old version product view */
  constructor(private _repository: ProductService) {}

  ngOnInit(): void {
    this._flagDisplayAddButton = true;
    this._repository.Katalogs().subscribe((d) => (this._katalogs = d));
    this._repository
      .TypeProducts()
      .subscribe((d) => (this._typeProducts = d));
  }
  // ngClass flags
  ViwePanel() {
    this._flagPanel1 = !this._flagPanel1;
    this._flagPanel2 = !this._flagPanel2;
    this._flagKatalogHiden = !this._flagKatalogHiden;
  }

  changeKagalog(item: Katalog) {
    this._selectedKagalog = item;
    this._flagDisplayAddButton = true;
    // this._repository.GetModel(item.id).subscribe((d) => (this._models = d));
    this.load(item.id);
  }

  changeTypeProduct(item: TypeProduct) {
    //  this._selectedProduct.idTypeProduct=item.id;
    console.log(item.id + '----' + item.name);
    this._selectedTypeProduct = item;
    this._flagInvalid = false; //-----11.05.21
  }
  onEditFormChange() {
    this._flagInvalid = false;
    console.log('EditProduct ----onchange--event ---');
  }

  changeProduct(item: Product) {
    // console.log(item.idTypeProduct+'--'+item.idKatalog+'--'+item.id+'--'+item.image+'--'+item.photo);
    this._selectedProduct = item;
    this._flag_sendServerData = true;
    // console.log('----id Katalog--' + this._selectedProduct.katalogId);
    if (this._selectedProduct.katalogId == -1) {
      this._errorUotput = true;
      this._error = 'Каталог не Выбран!!';
      //   console.log('this._error="Каталог не Выбран!!"------------01.05.21--');
      this.cancel();
    } else {
      // this._selectedProduct = this._products.find(x=>x.id==item.id);
      // console.log("_selectedProduct--"+this._selectedProduct.id+'---TypeProd'+this._selectedProduct.typeProductId);
      this._error = '';
      this._errorUotput = false;
      this._selectedTypeProduct = this._typeProducts?.find(
        (x) => x.id == this._selectedProduct.typeProductId
      )||<TypeProduct>{id:-1,name:""};

      this._flagViewMode = 'edit';
      this._flagPhoto = true;
      this._flag_ng_template = true;

      // let url=  this._url_img + this._selectedProduct.image;
      // this.getPhotoBase64(this._selectedProduct.image);
      //  this.previewOld();
      this.getBlobImg(this._selectedProduct.imgName||this.defaulImg.name);

      this._flagDisplayAddButton = false;
      // this._selectedProduct.idTypeProduct-------------------------------------
    }
  }

  addProduct() {
    this._selectedProduct = <Product>{id:-1,name:'',katalogId:-1};       //new Product(-1, '', -1, null, null, null);
    this._flag_sendServerData = true;

    this._flagViewMode = 'create';
    this._flagPhoto = false;
    this._flagDisplayAddButton = false;
  }
  saveProduct() {
    //---begin start progress file
    this._flagInvalid = true;
    this._flag_sendServerData = false;

    //--- end progess file
    this._selectedProduct.katalogId = this._selectedKagalog.id;
    this._selectedProduct.typeProductId = this._selectedTypeProduct.id;

    this._errorUotput = true;
    this._flagDisplayAddButton = true;

    if (
      this._selectedProduct.imageBase64 == '' ||
      this._selectedProduct.imageBase64 == null
    ) {
      this._error = 'Фото невыбрано!!';
      return;
    }

    if (this._flagViewMode === 'create') {
      //------------------------- 28.04.21---------------------

      this._repository.Create(this._selectedProduct).subscribe(
        (data: HttpEvent<Product>) => {
          //progress bar
          if (data.type === HttpEventType.UploadProgress) {
          }
          switch (data.type) {
            case HttpEventType.Sent:
              console.log('Sent-- запрос отправлен--CreateProduct--'); // запрос отправлен
              break;
            case HttpEventType.UploadProgress:
              // do something
              if (data.total){
              this._progress = Math.round((100 * data.loaded) / data.total);
              console.log('HttpEventType.UploadProgress--' + this._progress);
              }
              break;
            case HttpEventType.Response:
              console.log('Finished');
              // do someting
              let d = data.body as Product;
              console.log('cteateProuct metod-- d.name--' + d.name);
              this._products.push(d);
              this._error = '';
              this._errorUotput = false;
              this.cancel(); //15.03.21
              break;
          }

          //  this._products.push().
          /* 15.05.21
          let d = data. as Product;
          console.log('cteateProuct metod-- d.name--' + d.name);
          this._products.push(d);
          */
        },
        (err) => {
          this._error = err.error;
          console.log(err);
          this._errorUotput = true;
        }
      );
    } else {
      // ---------SEND DATA TO SERVER----------------

      this._repository.Update(this._selectedProduct).subscribe(
        (data: HttpEvent<any>) => {
          //progress bar
          switch (data.type) {
            case HttpEventType.Sent:
              console.log('Sent-- запрос отправлен--UpdateProduct--'); // запрос отправлен
              break;
            case HttpEventType.UploadProgress:
              // do something
              if (data.total){
              this._progress = Math.round((100 * data.loaded) / data.total);
              console.log('HttpEventType.UploadProgress--' + this._progress);
              }
              break;
            case HttpEventType.Response:
              console.log('---Finished-----');
              this._error = '';
              this._errorUotput = false;

              this.cancel(); //15.03.21
              break;
          }
          // end progrss bar
        },
        (err) => {
          this._error = err.error;
          console.log(err);
          this._errorUotput = true;
        }
      );

      // console.log(" throwError('not impliment exeption');")

      // throwError("not impliment exeption");
    }
    // throwError("not impliment exeption");
    // this.reload(this._selectedKagalog.id);

    //this.cancel();//13.03.2021
  }

  deleteModel() {
    this._repository.Delete(this._selectedProduct.id).subscribe(
      () => {
        console.log('delet prodict item ok__' + this._selectedProduct.name);
        //---------------------------

        this._error = '';
        this._errorUotput = false;

        //  this._products.push().

        this._products = this._products.filter(
          (i) => i.id !== this._selectedProduct.id
        );
        this.cancel(); //15.03.21
      },
      (err) => {
        this._error = err.error;
        console.log(err);
        this._errorUotput = true;
      }
      //------------------------
    );
  }
  cancel() {
    this._flagViewMode = 'default';

    this._error = '';
    this._errorUotput = false;

    this._selectedProduct =<Product>{id:-1,name:'',katalogId:-1}; //05.05.21
    //this._dataFile=null;   19.12.20       ------------&&&????
    this._flagDisplayAddButton = true;
    this._flagPhoto = false;
    this._flagInvalid = true;
    // this._flagKatalogHiden=false;
    this.ViwePanel();

    //  this.changeKagalog(this._selectedKagalog);
  }
  //----откат-- шаблона(возврат)------------
  undo() {
    this._flag_sendServerData = true;
  }

  // перезагрузить данные подКаталога по id
  load(idKatalog: number) {
    this._repository.Products(idKatalog,undefined).subscribe(
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

  // взаимидейсвеие с дочерним компонентом
  onSetFilePhoto(event: CorpImgFile) {
    if (!event.flag) {
      this._flagButton = false;
      this._flagPhoto = false;
      this._flag_ng_template = false;
      this._selectedProduct.imageBase64 = null;

      // console.log('onSetFilePhoto- flag flase -event.fileBase64' + event.fileBase64 );
    } else {
      //  console.log( 'onSetFilePhoto- flag true -event.fileBase64--' + event.fileBase64  );

      // event генерируется в дочернем компоненте (задается тип и значение переменной)
      this._selectedProduct.imageBase64 = event.fileBase64; //this._imgBase64 = event;
      // в дочернем component crop-upload-file blog convert to type~{image/png}
      //  png server --обработка только (.png)
      //  this._selectedImage.name = 'temp.png';

      // this._flagInvalid = true;
      this._flagButton = true;
      if (this._selectedProduct.imageBase64.length > 0) {
        this._errorUotput = false;
        this._flagInvalid = false;
      }
    }
  }

  getBlobImg(name: string) {
    this._repository.GetBlobIMG(name).subscribe((d) => {
      this.createImageFromBlob(d);
    });
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this._selectedProduct.imageBase64 = reader.result;
      },
      false
    );
    if (image) {
      reader.readAsDataURL(image);
    }
    console.log('----------------------------cBlob -------------------');
  }
}
