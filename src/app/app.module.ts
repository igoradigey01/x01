import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MaterialModule} from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './header/menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {BgContentComponent} from './content/bg-content/bg-content.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BgContentComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
