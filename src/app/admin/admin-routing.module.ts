import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminBarComponent} from './admin-bar/admin-bar.component'

const routes: Routes = [
  { path: '', component: AdminBarComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
