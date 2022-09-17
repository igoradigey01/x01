import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDataService } from './shared/sevices/product.servisce';
import { ProductDetailsService } from './shared/sevices/product-details.service';
import {PrivacyComponent}  from './privacy-policy/privacy.component';
import { OptKatalogComponent } from './opt-katalog/opt-katalog.component';
import { OptProductComponent } from './opt-product/opt-product.component';
import { ManagerServiceModule } from "./shared/sevices/maneger-service.module";

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsComponent,
    PrivacyComponent,
    OptKatalogComponent,
    OptProductComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ManagerServiceModule
    ],
  providers: [  

  ],
  exports: [
    ProductComponent,
    ProductDetailsComponent,
    PrivacyComponent,
    OptKatalogComponent,
    OptProductComponent
  ],
})
export class ContentModule { }
