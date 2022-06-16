import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';
import { QrCodeModule } from 'ng-qrcode';
import { UiFrontModule } from '../ui-front/ui-front.module';
import { MaterialFrontModule } from 'src/app/material/material-front.module.'
import { ManagerServiceModule } from './shared/services/maneger-service.module';
import { CoreNomenclatureModule } from 'src/app/core-nomenclature/core-nomenclature.module'
import { NomenclatureComponent } from './nomenclature_/nomenclature/nomenclature.component';
import { OptNomenclatureComponent } from './nomenclature_/opt-nomenclature/opt-nomenclature.component'
import { NomenclatureItemComponent } from './nomenclature_/nomenclature-item/nomenclature-item.component';
import { OptNomenclatureItemComponent } from './nomenclature_/opt-nomenclature-item/opt-nomenclature-item.component';
import { NomenclatureItemResolver } from './shared/resolver/nomenclature-item.resolver'


import { ClipboardModule } from '@angular/cdk/clipboard'
import { KatalogNComponent } from './katalog_/katalog-n/katalog-n.component';
import { OptKatalogNComponent } from './katalog_/opt-katalog-n/opt-katalog-n.component'
import { OptCategoriaNComponent } from './categoria_/opt-categoria-n/opt-categoria-n.component';
import {CategoriaNComponent} from './categoria_/categoria-n/categoria-n.component'


import { QrCodeComponent } from './nomenclature_/qr-code/qr-code.component'  //  qr-code/qr-code.component';

@NgModule({
  declarations: [
    KatalogNComponent,
    OptCategoriaNComponent,
    OptKatalogNComponent,
    NomenclatureComponent,
    OptNomenclatureComponent,
    NomenclatureItemComponent,
    OptNomenclatureItemComponent,
    QrCodeComponent,
    CategoriaNComponent

  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ManagerServiceModule,
    UiFrontModule,
    MaterialFrontModule,
    QrCodeModule,
    ClipboardModule,
    CoreNomenclatureModule,


  ],
  exports: [
    KatalogNComponent,
    OptCategoriaNComponent,
    OptKatalogNComponent
  ],
  providers: [
    NomenclatureItemResolver
  ]
})
export class ContentNModule { }
