import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDataService } from './shared/sevices/product.servisce';
import { ProductDetailsService } from './shared/sevices/product-details.service';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
  ],
  providers: [
    ProductDataService,
    ProductDetailsService
  ],
  exports: [
    ProductComponent,
    ProductDetailsComponent
  ],
})
export class ContentModule { }
