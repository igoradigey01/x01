import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './../material/material.module';
import {UiModule} from './../ui/ui.module'

import { ManagerRoutingModule } from './magager-routing.module';
import { KatalogComponent } from './katalog/katalog.component';
import { NomenclatureComponent } from './nomenclature/nomenclature.component';
import { ContentComponent } from './content/content.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product_/product-1/product.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { InfoComponent } from './info/info.component';
import { ManagerServiceModule } from './shared/sevices/maneger-service.module';
import { ImageCropperModule } from 'ngx-image-cropper'; //03.05.21
import { CropUploadFilesComponent } from './crop-upload-files/crop-upload-files.component';
import { ProductViewComponent } from './product_/product-view/product-view.component';


import { TableProductComponent } from './product_/table-product/table-product.component';
import { ItemProductComponent } from './product_/item-product/item-product.component';
import { DetailsProductComponent } from './product_/details-product/details-product.component';
import { ProductMainComponent } from './product_/product-main/product-main.component';
import { ImgRenderComponent } from './product_/img-render/img-render.component';


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
    ProductViewComponent,


    TableProductComponent,
    ItemProductComponent,
    DetailsProductComponent,
    ProductMainComponent,
    ImgRenderComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ManagerServiceModule,
    FormsModule,
    ImageCropperModule,
    MaterialModule,
    UiModule,
    LayoutModule  //material cdk module
  ],
})
export class ManagerModule {}
