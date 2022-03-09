import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './../material/material.module';
import { UiModule } from './../ui/ui.module';
import { ImageCropperModule } from 'ngx-image-cropper';


import { ManagerRoutingModule } from './magager-routing.module';
import { KatalogComponent } from './katalog_/katagog-main/katalog-main.component';
import { NomenclatureComponent } from './nomenclature/nomenclature.component';
import { ManagerBarComponent } from './manager-bar/manager-bar.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product_/product-1/product.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { InfoComponent } from './info/info.component';
import { ManagerServiceModule } from './shared/sevices/maneger-service.module';

import { CropUploadFilesComponent } from './crop-upload-files/crop-upload-files.component';
import { ProductTableComponent } from './product_/product-table/product-table.component';

import { ItemProductComponent } from './product_/product-item/item-product.component';
import { DetailsProductComponent } from './product_/product-details/details-product.component';
import { ProductMainComponent } from './product_/product-main/product-main.component';
import { KatalogItemComponent } from './katalog_/katalog-item/katalog-item.component';
import { MaterialMainComponent } from './material_/material-main/material-main.component';
import { MaterialItemComponent } from './material_/material-item/material-item.component';
import { CategoriaItemComponent } from './categoria_/categoria-item/categoria-item.component';
import { CategoriaMainComponent } from './categoria_/categoria-main/categoria-main.component'


@NgModule({
  declarations: [
    KatalogComponent,
    NomenclatureComponent,
    ManagerBarComponent,
    ProductComponent,
    UploadFilesComponent,
    ProductDetailsComponent,
    ProductTypeComponent,
    InfoComponent,
    CropUploadFilesComponent,
    ProductTableComponent,
    ItemProductComponent,
    DetailsProductComponent,
    ProductMainComponent,
    KatalogItemComponent,
    MaterialMainComponent,
    MaterialItemComponent,
    CategoriaMainComponent,
    CategoriaItemComponent,


  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ManagerServiceModule,
    FormsModule,

    ImageCropperModule,
    MaterialModule,
    UiModule,
    LayoutModule, //material cdk module
  ],
})
export class ManagerModule {}
