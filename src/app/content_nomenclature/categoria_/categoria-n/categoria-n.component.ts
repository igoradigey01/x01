import { Component, OnInit, Input } from '@angular/core';

import { CategoriaN} from 'src/app/_shared/_interfaces/categoria-n.model';
import { CategoriaNService} from '../../shared/services/categoria-n.servise';
import { Meta, Title } from '@angular/platform-browser';
import {SharedVarService} from 'src/app/_shared/services/shared-var.service';
import {SEO_var} from 'src/app/_shared/_interfaces/SEO-var.models'

@Component({
  selector: 'app-categoria-n',
  templateUrl: './categoria-n.component.html',
  styleUrls: ['./categoria-n.component.scss']
})
export class CategoriaNComponent implements OnInit {

  @Input() flagStyle: boolean = false;

  _categoriaNs: CategoriaN[] | null = null;

  private pathRoot: string = '../../assets/bg_img/';

  public get  getUrl(){
    return "background-image: url("+this.pathRoot + "img_1.webp" +");"

  }

  //-------------------
  constructor(
    private _repository:  CategoriaNService,
    private _meta: Meta,
    private _titleMeta: Title,
    private _sharedVar:SharedVarService

    ) {



    }

  ngOnInit(): void {
    this._titleMeta.setTitle('XF-01  Ханская Комплектующие Мебель | цены в интернет-магазине | Доставка     ');
    this._meta.addTag({name: "description", content: "мебельная фурнитура для кухни спальни прихожей .Наполнение для шкафов и гардеробных комнат .XF-01  интернет-магазин недорогой Номенклатуры для мебели  . Оперативная  аккуратная доставка ."})
    this._meta.addTag({name: "keywords", content: "ханская  мебель корпусная заказ комплектующие форнитура цена  "})



    this._repository.CategoriaNs().subscribe(
      (data) => {
        this._categoriaNs = data;
        console.log(this._categoriaNs);
      },
      (err) => console.log('load katalog err: --' + err)
    );

    this._repository.CategoriaNs().subscribe((data) => {
      this._categoriaNs = data;
    });
    this._repository.ArticleNs().subscribe((data) => {
      this._sharedVar.ArticleNs = data;
    });
    this._repository.ColorNs().subscribe((data) => {
      this._sharedVar.ColorNs = data;
    });
    this._repository.BrandNs().subscribe((data) => {
      this._sharedVar.BrandNs = data;
    });

  }

  public onSharedVarSet(item:CategoriaN){
  let i=<SEO_var>{id:item.id,decriptSEO:item.decriptSEO}

    this._sharedVar.SEO_let=i;


  }
}
//------------------------------

