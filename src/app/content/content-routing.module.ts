import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './product/product.component';
import {ProductDetailsComponent} from './product-details/product-details.component'



const routes: Routes = [

  {path:"katalog/:id",component:ProductComponent},  // перепделать на сервере- katalog(id)
  {path:"product/:id",component:ProductDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
