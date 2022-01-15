import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/_interfaces/product.model';
import { EventEmitter, Input, Output } from '@angular/core';
//import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-img-render',
  templateUrl: './img-render.component.html',
  styleUrls: ['./img-render.component.scss'],
})
export class ImgRenderComponent implements OnInit {
  @Input() public _img_name: string | undefined;
  @Input() public _rootSrc: string | undefined; //='not_found.png';
  public _img_cropped: any;
  public _imageChangedFromFile: any;

  public _messagess_show: string | undefined;
  public _flagError = false;
  loading = false;

  public _flagPhoto: boolean = false;

  public get SrcImg() {
    if (this._flagPhoto) return this._img_cropped;
    if (this._rootSrc && this._img_name) return this._rootSrc + this._img_name;
    return this._rootSrc + 'not_found.png';
  }

  constructor() {}

  ngOnInit(): void {}
  public onSetFilePhoto(event: any) {
    this._flagPhoto = true;
    //  this._select_obj= URL.createObjectURL(event.files[0])
    this._imageChangedFromFile = event;
  }

  /*  imageLoaded(){

     this._messagess_show='Файл успешно загружен..';
     this._flagError=false;
    // console.log("croped-img: loadImageFeled()-show ok");

   } */

  loadImageFailed() {
    // console.error('Load image failed');
    this._messagess_show = 'Ошибка - файл не загружен,';
    this._flagError = true;
  }

  public imageCropped(event: any) {
    this._img_cropped = event.base64;
  }
}
