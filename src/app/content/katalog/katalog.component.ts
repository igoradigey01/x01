import { Component, OnInit, Input } from '@angular/core';

import { Katalog } from '../../shared/_interfaces/katalog.model';
import { KatalogService } from './../shared/sevices/katalog.service';
import { Meta, Title } from '@angular/platform-browser';
import {SharedVarService} from 'src/app/shared/services/shared-var.service';
import {SEO_var} from 'src/app/shared/_interfaces/SEO-var.models'

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.scss'],
})
export class KatalogComponent implements OnInit {
  @Input() flagStyle: boolean = false;

  katalogs: Katalog[] | null = null;

  //-------------------
  constructor(
    private repository: KatalogService,
    private meta: Meta,
    private titleMeta: Title,
    private sharedVar:SharedVarService

    ) {



    }

  ngOnInit(): void {
    this.titleMeta.setTitle('X-01  Ханская мебель| цены в интернет-магазине | Доставка  производство   ');
    this.meta.addTag({name: "description", content: "Возможно Производство мебели на заказ по индивидуальным размерам .X-01  интернет-магазин недорогой мебели  . Оперативная  аккуратная доставка и сборка товара."})
    this.meta.addTag({name: "keywords", content: "ханская производство мебель корпусная заказ комплектующие форнитура цена  "})



    this.repository.Katalogs().subscribe(
      (data) => {
        this.katalogs = data;
        console.log(this.katalogs);
      },
      (err) => console.log('load katalog err: --' + err)
    );
  }

  public onSharedVarSet(item:Katalog){
  let i=<SEO_var>{id:item.id,decriptSEO:item.decriptSEO,keywordsSEO:item.keywordsSEO}

    this.sharedVar.SEO_let=i;


  }
}
//------------------------------
