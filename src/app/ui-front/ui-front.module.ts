import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { FilterNComponent } from './filter-n/filter-n.component';
import { FormsModule } from '@angular/forms';
import {CoreNomenclatureModule} from 'src/app/core-nomenclature/core-nomenclature.module'



@NgModule({
  declarations: [
    FilterNComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    CoreNomenclatureModule
  ],
  exports:[
    FilterNComponent
  ]
})
export class UiFrontModule { }
