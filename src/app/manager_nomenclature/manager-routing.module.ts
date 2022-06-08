import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerGuard } from './manager.guard';
import { ManagerBarComponent } from './manager-bar/manager-bar.component';
import { InfoComponent } from './info/info.component';
import {KatalogNMainComponent} from './katalog-n_/katalog-n-main/katalog-n-main.component'
import {CategoriaNMainComponent} from './categoria-n_/categoria-n-main/categoria-n-main.component'
import {ColorNMainComponent} from './color-n_/color-n-main/color-n-main.component';
import {BrandMainComponent} from './brand-n_/brand-main/brand-main.component';
import {ArticleNMainComponent} from './article-n_/article-n-main/article-n-main.component'
import {NomenclatureMainComponent} from './nomenclature_/nomenclature-main/nomenclature-main.component'




const routes: Routes = [
  { path: '', component: ManagerBarComponent , canActivate: [ManagerGuard]},
  {path:'katalog-n',component:KatalogNMainComponent, canActivate: [ManagerGuard]},
  {path:'categoria-n',component:CategoriaNMainComponent, canActivate: [ManagerGuard]},
  {path:'color-n',component:ColorNMainComponent, canActivate: [ManagerGuard]},
  {path:'brand-n',component:BrandMainComponent , canActivate: [ManagerGuard]},
  {path:'article-n',component:ArticleNMainComponent, canActivate: [ManagerGuard]},
  {path:'nomenclature',component:NomenclatureMainComponent, canActivate: [ManagerGuard] },
  { path: 'info', component: InfoComponent, canActivate: [ManagerGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[ManagerGuard]
})
export class ManagerRoutingModule { }
