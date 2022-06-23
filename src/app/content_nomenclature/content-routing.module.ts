import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KatalogNComponent } from './katalog_/katalog-n/katalog-n.component';
import { OptKatalogNComponent } from './katalog_/opt-katalog-n/opt-katalog-n.component';
import { OptCategoriaNComponent } from './categoria_/opt-categoria-n/opt-categoria-n.component';

import { NomenclatureComponent } from './nomenclature_/nomenclature/old-nomenclature.component';
import { NomenclatureItemComponent } from './nomenclature_/nomenclature-item/nomenclature-item.component';
import { OptNomenclatureComponent } from './nomenclature_/opt-nomenclature/opt-nomenclature.component';
import { OptNomenclatureItemComponent } from './nomenclature_/opt-nomenclature-item/opt-nomenclature-item.component';
import { ContentGuard } from './content.guard';
// import { NomenclatureItemResolver } from './shared/resolver/nomenclature-item.resolver';
import {CategoriaNComponent} from './categoria_/categoria-n/categoria-n.component'

const routes: Routes = [
  {
    path: '',
    component: CategoriaNComponent,
  },

  {
    path: 'categoria/:id',
    component: KatalogNComponent,
  },
  { path: 'categoria/katalog/:id', component: NomenclatureComponent },
  {
    path: 'categoria/katalog/nomenclature/:id',
    component: NomenclatureItemComponent
  },

  {
    path: 'opt',
    component: OptCategoriaNComponent,
    //canActivate:[ContentGuard] - relize in component for init http://localhost:4200/content/opt?user=opt1
  },
  {
    path: 'opt/:id',
    component: OptKatalogNComponent,
    canActivate: [ContentGuard],
  },
  {
    path: 'opt/optkatalog/:id',
    component: OptNomenclatureComponent,
   // canActivate: [ContentGuard],
  },
  {
    path: 'opt/optkatalog/optnomenclature/:id',
    component: OptNomenclatureItemComponent

   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ContentGuard],
})
export class ContentRoutingModule {}
