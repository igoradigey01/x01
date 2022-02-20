import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './../material/material.module';
import { ImageCropperModule } from 'ngx-image-cropper'; //03.05.21
import { RouterModule } from '@angular/router';

import { RootViewElementComponent } from './root-view-element/root-view-element.component';
import { LeftPanelViewElementComponent } from './left-panel-view-element/left-panel-view-element.component';
import { ImgRenderComponent } from './img-render/img-render.component';
import { VersionInfoComponent } from './version-info/version-info.component';

@NgModule({
  declarations: [
    RootViewElementComponent,
    LeftPanelViewElementComponent,
    ImgRenderComponent,
    VersionInfoComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule, //material cdk module
    ImageCropperModule,
    RouterModule,
  ],
  exports: [
    RootViewElementComponent,
    LeftPanelViewElementComponent,
    ImgRenderComponent,
    VersionInfoComponent
  ],
})
export class UiModule {}
