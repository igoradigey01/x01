import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';
import { KatalogNComponent } from './katalog_/katalog-n/katalog-n.component';
import {OptKatalogNComponent} from './katalog_/opt-katalog-n/opt-katalog-n.component'
import { OptCategoriaNComponent } from './categoria_/opt-categoria-n/opt-categoria-n.component';
import {ManagerServiceModule} from './shared/services/maneger-service.module';
import {MaterialFrontModule} from 'src/app/material/material-front.module.'
import { NomenclatureComponent } from './nomenclature_/nomenclature/nomenclature.component';
import { OptNomenclatureComponent } from './nomenclature_/opt-nomenclature/opt-nomenclature.component'
import { UiFrontModule} from './../ui-front/ui-front.module';
import { NomenclatureItemComponent } from './nomenclature_/nomenclature-item/nomenclature-item.component';
import { OptNomenclatureItemComponent } from './nomenclature_/opt-nomenclature-item/opt-nomenclature-item.component';
import {NomenclatureItemResolver} from './shared/resolver/nomenclature-item.resolver'
import { QrCodeModule } from 'ng-qrcode';
import { ClipboardModule } from '@angular/cdk/clipboard'

import { QrCodeComponent } from '../content_/nomenclature_/qr-code/qr-code.component';

@NgModule({
  declarations: [
    KatalogNComponent,
    OptCategoriaNComponent,
    OptKatalogNComponent,
    NomenclatureComponent,
    OptNomenclatureComponent,
    NomenclatureItemComponent,
    OptNomenclatureItemComponent,
    QrCodeComponent

  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ManagerServiceModule,
    UiFrontModule,
    MaterialFrontModule,
    QrCodeModule,
    ClipboardModule

  ],
  exports:[
    KatalogNComponent,
    OptCategoriaNComponent,
    OptKatalogNComponent
  ],
  providers:[
    NomenclatureItemResolver
  ]
})
export class ContentModule { }
