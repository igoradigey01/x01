import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{AboutComponent} from './about/about.component';
import{GarantiyaComponent} from './garantiya/garantiya.component';
import{KakZakazatComponent} from './kak-zakazat/kak-zakazat.component';
import{OplataIDostavkaComponent} from './oplata-i-dostavka/oplata-i-dostavka.component';



const routes: Routes = [


  {path:'kak-zakazat',component:KakZakazatComponent},
 {path:'garantiya',component:GarantiyaComponent},
 {path:'about',component:AboutComponent},
  {path:'oplata-i-dostavka',component:OplataIDostavkaComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
