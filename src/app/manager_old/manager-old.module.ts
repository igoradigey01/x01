import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFilesComponent } from '../manager_old/upload-files/upload-files.component';
import { CropUploadFilesComponent } from '../manager_old/crop-upload-files/crop-upload-files.component';
import { ProductTypeComponent } from '../manager_old/product-type/product-type.component';
import { NomenclatureComponent } from '../manager_old/nomenclature/nomenclature.component';
import { ProductDetailsComponent } from '../manager_old/product-details/product-details.component';
import { ProductComponent } from '../manager_old/product-1/product.component';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';




@NgModule({
  declarations: [
    UploadFilesComponent,
    CropUploadFilesComponent,
    ProductTypeComponent,
    NomenclatureComponent,
    ProductDetailsComponent,
    ProductComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ImageCropperModule
  ]
})
export class ManagerOldModule { }
