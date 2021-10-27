import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './magager-routing.module';
import { KatalogComponent } from './katalog/katalog.component';

import { NomenclatureComponent } from './nomenclature/nomenclature.component';

import { ContentComponent } from './content/content.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { InfoComponent } from './info/info.component';
import {ManagerServiceModule} from './shared/sevices/maneger-service.module'
import { ImageCropperModule } from 'ngx-image-cropper'; //03.05.21
import { CropUploadFilesComponent } from './crop-upload-files/crop-upload-files.component';

@NgModule({
  declarations: [
    KatalogComponent,
    NomenclatureComponent,
    ContentComponent,
    ProductComponent,
    UploadFilesComponent,
    ProductDetailsComponent,
    ProductTypeComponent,
    InfoComponent,
    CropUploadFilesComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ManagerServiceModule,
    FormsModule,
    ImageCropperModule,
  ],
})
export class ManagerModule {}
