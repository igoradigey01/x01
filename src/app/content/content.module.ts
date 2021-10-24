import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDataService } from './shared/sevices/product.servisce';

@NgModule({
  declarations: [
    ProductComponent
    //  ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
  ],
  providers: [
    ProductDataService
  ],
  exports: [
    ProductComponent
    // ProductDetailsComponent
  ],
})
export class ContentModule { }
