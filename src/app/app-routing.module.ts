import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {BgContentComponent} from './content/bg-content/bg-content.component';

const routes: Routes = [
  {path:"",component:BgContentComponent},
  {
    path: 'menu',
    loadChildren: () =>
      import('./header/header.module').then((m) => m.HeaderModule),
  },
  {
     path: 'content',loadChildren:()=>import('./content/content.module').then((m)=>m.ContentModule)
  },
  {
    path: 'manager',loadChildren:()=>import('./manager/manager.module').then((m)=>m.ManagerModule)
 },
 {
  path: 'account',loadChildren:()=>import('./account/account.module').then((m)=>m.AuthModule)
},

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
