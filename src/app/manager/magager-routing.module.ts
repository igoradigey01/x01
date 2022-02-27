import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerBarComponent } from './manager-bar/manager-bar.component';
import { KatalogComponent } from './katalog/katagog-main/katalog-main.component';
import { ProductComponent } from './product_/product-1/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { InfoComponent } from './info/info.component';
import { NomenclatureComponent } from './nomenclature/nomenclature.component';
import { ProductMainComponent } from './product_/product-main/product-main.component';
import { ProductTableComponent } from './product_/product-table/product-table.component';
import { ManagerGuard } from './manager.guard';

// table-product , item-product ,details-product

const routes: Routes = [
  { path: '', component: ManagerBarComponent, canActivate: [ManagerGuard] },
  { path: 'katalog', component: KatalogComponent, canActivate: [ManagerGuard] },
  { path: 'product', component: ProductComponent, canActivate: [ManagerGuard] },
  {
    path: 'item-product',
    component: ProductDetailsComponent,
    canActivate: [ManagerGuard],
  },
  {
    path: 'type-product',
    component: ProductTypeComponent,
    canActivate: [ManagerGuard],
  },
  { path: 'info', component: InfoComponent, canActivate: [ManagerGuard] },
  {
    path: 'nomenclature',
    component: NomenclatureComponent,
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
