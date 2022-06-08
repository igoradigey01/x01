import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { FilterNComponent } from './filter-n/filter-n.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FilterNComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports:[
    FilterNComponent
  ]
})
export class UiFrontModule { }
