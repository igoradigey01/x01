import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerBarComponent } from './manager-bar/manager-bar.component';
import { KatalogMainComponent } from './katalog_/katagog-main/katalog-main.component';


import { MaterialMainComponent } from './material_/material-main/material-main.component';
import { InfoComponent } from './info/info.component';

import { ProductMainComponent } from './product_/product-main/product-main.component';
//import { ProductTableComponent } from './product_/product-table/product-table.component';
import { CategoriaMainComponent } from './categoria_/categoria-main/categoria-main.component';
import { ManagerGuard } from './manager.guard';
import {NomenclatureMainComponent} from './nomenclature_/nomenclature-main/nomenclature-main.component'

// table-product , item-product ,details-product

const routes: Routes = [
  { path: '', component: ManagerBarComponent, canActivate: [ManagerGuard] },
  { path: 'katalog', component: KatalogMainComponent, canActivate: [ManagerGuard] },

  {
    path: 'material',
    component: MaterialMainComponent,
    canActivate: [ManagerGuard],
  },
  {
    path: 'categoria',
    component: CategoriaMainComponent,
    canActivate: [ManagerGuard],
  },
  { path: 'info', component: InfoComponent, canActivate: [ManagerGuard] },
  {
    path: 'nomenclature',
    component: NomenclatureMainComponent,
    canActivate: [ManagerGuard],
  },

  {
    path: 'product-main',
    component: ProductMainComponent,
    canActivate: [ManagerGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ManagerGuard],
})
export class ManagerRoutingModule {}
