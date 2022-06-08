import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { ManagerServiceModule } from './shared/services/maneger-service.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UiModule } from './../ui/ui.module';
import { InfoComponent } from './info/info.component';
import { ManagerBarComponent } from './manager-bar/manager-bar.component';
import {CategoriaNMainComponent} from './categoria-n_/categoria-n-main/categoria-n-main.component'
import {CategoriaNItemComponent} from './categoria-n_/categoria-n-item/categoria-n-item.component'
import {KatalogNItemComponent} from './katalog-n_/katalog-n-item/katalog-n-item.component';
import {KatalogNMainComponent} from './katalog-n_/katalog-n-main/katalog-n-main.component';
import { BrandMainComponent } from './brand-n_/brand-main/brand-main.component';
import { BrandItemComponent } from './brand-n_/brand-item/brand-item.component';
import { ColorNMainComponent } from './color-n_/color-n-main/color-n-main.component';
import { ColorNItemComponent } from './color-n_/color-n-item/color-n-item.component';
import { ArticleNMainComponent } from './article-n_/article-n-main/article-n-main.component';
import { ArticleNItemComponent } from './article-n_/article-n-item/article-n-item.component';
import { NomenclatureMainComponent } from './nomenclature_/nomenclature-main/nomenclature-main.component';
import { NomenclatureTableComponent } from './nomenclature_/nomenclature-table/nomenclature-table.component';
import { NomenclatureItemComponent } from './nomenclature_/nomenclature-item/nomenclature-item.component';
import { NomenclatureCategoriaComponent } from './nomenclature_/nomenclature-categoria/nomenclature-categoria.component';
import { NomenclatureKatalogComponent } from './nomenclature_/nomenclature-katalog/nomenclature-katalog.component'
import { UiFrontModule} from './../ui-front/ui-front.module';






@NgModule({
  declarations: [
    InfoComponent,
    ManagerBarComponent,
    KatalogNItemComponent,
    KatalogNMainComponent,
    BrandMainComponent,
    BrandItemComponent,
    ColorNMainComponent,
    ColorNItemComponent,
    ArticleNMainComponent,
    ArticleNItemComponent,
    NomenclatureMainComponent,
    NomenclatureTableComponent,
    NomenclatureItemComponent,
    CategoriaNMainComponent,
    CategoriaNItemComponent,
    NomenclatureCategoriaComponent,
    NomenclatureKatalogComponent,


  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ManagerRoutingModule,
    ManagerServiceModule,
    FormsModule,
    ImageCropperModule,
    MaterialModule,
    UiModule,
    UiFrontModule
  ]
})
export class ManagerModule { }
