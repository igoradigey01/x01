import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import{ContentComponent} from './content/content.component';
import{KatalogComponent} from './katalog/katalog.component';
import{ProductComponent} from './product/product.component';
import{ProductDetailsComponent} from './product-details/product-details.component'
import{ProductTypeComponent} from './product-type/product-type.component';
import{InfoComponent} from './info/info.component';
import {NomenclatureComponent} from './nomenclature/nomenclature.component'
import { from } from 'rxjs';

const routes: Routes = [
  {path:'',component:ContentComponent},
  {path:'katalog',component:KatalogComponent},
  {path:'product',component:ProductComponent},
  {path:'item-product',component:ProductDetailsComponent},
  {path:'type-product',component:ProductTypeComponent},
  {path:'info',component:InfoComponent},
  {path:'nomenclature',component:NomenclatureComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
