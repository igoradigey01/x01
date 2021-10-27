import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { from } from 'rxjs';
import {CorpImgFile} from './../shared/_interfaces/crop-img.model';
@Component({
  selector: 'app-crop-upload-files',
  templateUrl: './crop-upload-files.component.html',
  styleUrls: ['./crop-upload-files.component.css'],
})
export class CropUploadFilesComponent implements OnInit {
  //@Input() _selectFile:File=null;
  @Output() getCropImg = new EventEmitter<CorpImgFile>();
  //----------- begin ngx-image-cropper----
  imageChangedEvent: any = '';
  croppedImage: any = '';
  _hidden:boolean = true;
  _unhidden:boolean=false;
  _cropImgFile:CorpImgFile=<CorpImgFile>{flag:false};

  ngOnInit(): void {}

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      this.getCropImg.emit(this._cropImgFile)
  }

  imageCropped(event:any) {
    this._cropImgFile.fileBase64=  this.croppedImage = event.base64;
  }

  showImg() {
    console.log(" ---changeImg()--------")
    this. _hidden = !this. _hidden;
   this._unhidden=!this._unhidden;
   this._cropImgFile.flag=true;
   this.getCropImg.emit(this._cropImgFile)

  }






}
