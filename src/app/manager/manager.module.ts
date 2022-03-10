import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './../material/material.module';
import { UiModule } from './../ui/ui.module';
import { ImageCropperModule } from 'ngx-image-cropper';

import { ManagerRoutingModule } from './magager-routing.module';
import { KatalogMainComponent } from './katalog_/katagog-main/katalog-main.component';

import { ManagerBarComponent } from './manager-bar/manager-bar.component';
import { FormsModule } from '@angular/forms';

import { InfoComponent } from './info/info.component';
import { ManagerServiceModule } from './shared/sevices/maneger-service.module';

import { ProductTableComponent } from './product_/product-table/product-table.component';

import { ItemProductComponent as ProductItemComponent } from './product_/product-item/item-product.component';
import { DetailsProductComponent } from './product_/product-details/details-product.component';
import { ProductMainComponent } from './product_/product-main/product-main.component';
import { KatalogItemComponent } from './katalog_/katalog-item/katalog-item.component';
import { MaterialMainComponent } from './material_/material-main/material-main.component';
import { MaterialItemComponent } from './material_/material-item/material-item.component';
import { CategoriaItemComponent } from './categoria_/categoria-item/categoria-item.component';
import { CategoriaMainComponent } from './categoria_/categoria-main/categoria-main.component';
import { NomenclatureMainComponent } from './nomenclature_/nomenclature-main/nomenclature-main.component';
import { NomenclatureItemComponent } from './nomenclature_/nomenclature-item/nomenclature-item.component';

@NgModule({
  declarations: [
    KatalogMainComponent,

    ManagerBarComponent,

    InfoComponent,

    ProductTableComponent,
    ProductItemComponent,
    DetailsProductComponent,
    ProductMainComponent,
    KatalogItemComponent,
    MaterialMainComponent,
    MaterialItemComponent,
    CategoriaMainComponent,
    CategoriaItemComponent,
    NomenclatureMainComponent,
    NomenclatureItemComponent,
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
