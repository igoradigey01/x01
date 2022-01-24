import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/_interfaces/product.model';
import { EventEmitter, Input, Output } from '@angular/core';
import {
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
} from 'ngx-image-cropper';

export interface DtoImage{
  base64Img:string,
  flagChanged:boolean
}

@Component({
  selector: 'app-img-render',
  templateUrl: './img-render.component.html',
  styleUrls: ['./img-render.component.scss'],
})
export class ImgRenderComponent implements OnInit {
  @Input() public _img_name: string | undefined;
  @Input() public _rootSrc: string | undefined; //='not_found.png';
  @Output() _onChangedDtoImage = new EventEmitter<DtoImage>();
  public _img_cropped: any = '';
  public _imageChanged: any = '';

  public _messagess_show: string | undefined;
  public _flagError = false;
  public _loading = false;

  public _flagPhoto: boolean = false;

  public _index_tabs: number = 0;

  public _transform: ImageTransform = {};
  public _scale = 1;

  public _rotation = 0;
  public _canvasRotation = 0;
  public _aspectRatio = 4 / 3;
  public _containWithinAspectRatio = false;
  public _maintainAspectRatio = true;

  public _size_h:number=0;
  public _size_w:number=0;

  public _cropped_size_h=0;
  public _cropped_size_w=0;
  public _resizeToHeight:number=700;

  public get ResizeToHeight(){
    return  this._resizeToHeight.toString();
  }
  public set  ResizeToHeight(event:string){
    this._resizeToHeight=Number.parseInt( event);
  }


  public get SrcImg() {
   // console.log("SrcImg()---" +this._img_name)
    if (this._flagPhoto) return this._img_cropped;
    if (this._rootSrc && this._img_name) return this._rootSrc + this._img_name;
    return this._rootSrc + 'not_found.png';
  }

  public get ShowCroppedTab(): boolean {
    if (this._index_tabs == 0) return false;
    return true;
  }

  constructor() {}

  ngOnInit(): void {}

  public selectedIndexChangeMatTabGroup(event: number) {
    this._index_tabs = event;
    if (this._index_tabs == 0&&this._flagPhoto){

    //  this._onChangedDtoImage.emit({base64Img:this._img_cropped,flagChanged:this._flagPhoto})

    }
  }

  public onSetFilePhoto(event: any): void {
    this._flagPhoto = true;
    //  this._select_obj= URL.createObjectURL(event.files[0])
    this._imageChanged = event;
    this._loading = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {
   // console.log('Cropper ready', sourceImageDimensions);
    this._size_h=sourceImageDimensions.height;
    this._size_w=sourceImageDimensions.width;
    this._loading = false;
  }

  imageLoaded() {
    this._messagess_show = 'Файл успешно загружен..';
    this._flagError = false;
    this._flagPhoto = true;
    this._loading = false;
    // console.log("croped-img: loadImageFeled()-show ok");
  }

  loadImageFailed() {
    // console.error('Load image failed');
    this._messagess_show = 'Ошибка - файл не загружен,';
    this._flagError = true;
    this._flagPhoto = false;
    this._loading = false;
  }

  public imageCropped(event: ImageCroppedEvent) {
    // console.log('imageCropped--', event.base64)

    this._img_cropped = event.base64;
    this._cropped_size_h=event.height;
    this._cropped_size_w=event.width;
  }
  public zoomOut() {
    this._scale -= 0.1;
    this._transform = {
      ...this._transform,
      scale: this._scale,
    };
  }

  public  zoomIn() {
    this._scale += 0.1;
    this._transform = {
      ...this._transform,
      scale: this._scale,
    };
  }
  public  resetImage() {
    this._loading = false;
    this._scale = 1;
    this._rotation = 0;
    this._canvasRotation = 0;
    this._transform = {};
  }

  public  toggleContainWithinAspectRatio() {
    this._containWithinAspectRatio = !this._containWithinAspectRatio;
  }
  public  toggleMaintainAspectRatio() {
    this._maintainAspectRatio = !this._maintainAspectRatio;
  }

  public  toggleAspectRatio() {
    this._aspectRatio = this._aspectRatio === 4 / 3 ? 16 / 5 : 4 / 3;
  }

  rotateLeft() {
    this._loading = true;
    setTimeout(() => { // Use timeout because rotating image is a heavy operation and will block the ui thread
      this._canvasRotation--;
      this.flipAfterRotate();
    });
  }

  rotateRight() {
    this._loading = true;
    setTimeout(() => {
      this._canvasRotation++;
      this.flipAfterRotate();
    });
  }

  private flipAfterRotate() {
    const flippedH = this._transform.flipH;
    const flippedV = this._transform.flipV;
    this._transform = {
      ...this._transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }

  flipHorizontal() {
    this._transform = {
      ...this._transform,
      flipH: !this._transform.flipH
    };
  }

  flipVertical() {
    this._transform = {
      ...this._transform,
      flipV: !this._transform.flipV
    };
  }



}
