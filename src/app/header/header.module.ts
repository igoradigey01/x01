import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderRoutingModule } from './header-routing.module';
import{AboutComponent} from './about/about.component'
import{GarantiyaComponent} from './garantiya/garantiya.component'
import{KakZakazatComponent} from './kak-zakazat/kak-zakazat.component'
import{OplataIDostavkaComponent} from './oplata-i-dostavka/oplata-i-dostavka.component'
import './../../styles/styles.scss';





@NgModule({
  declarations: [
    AboutComponent,
    GarantiyaComponent,
    KakZakazatComponent,
    OplataIDostavkaComponent,

  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,


  ],
   exports:[
     AboutComponent,
     GarantiyaComponent,
     KakZakazatComponent,
     OplataIDostavkaComponent,

   ]
})
export class HeaderModule { }
