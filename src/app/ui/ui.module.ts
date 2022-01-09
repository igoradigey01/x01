import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './../material/material.module';

import { UiRoutingModule } from './ui-routing.module';
import {RootViewElementComponent} from './root-view-element/root-view-element.component'

import { LeftPanelViewElementComponent } from './left-panel-view-element/left-panel-view-element.component';


@NgModule({
  declarations: [
    RootViewElementComponent,
    LeftPanelViewElementComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule, //material cdk module
    UiRoutingModule
  ],
  exports:[
    RootViewElementComponent,
    LeftPanelViewElementComponent
  ]
})
export class UiModule { }
