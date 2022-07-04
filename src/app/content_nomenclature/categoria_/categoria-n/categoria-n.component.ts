import { Component, OnInit } from '@angular/core';


import { CategoriaN} from 'src/app/core-nomenclature/_interfaces/categoria-n.model';
import { CategoriaNService} from '../../shared/services/categoria-n.servise';
import { Meta, Title } from '@angular/platform-browser';
import {NomenclatrueVarService} from '../../shared/services/nomenclature-var.service';
import {SEO_var} from 'src/app/shared/_interfaces/SEO-var.models';
import {BaseCategoriaNComponent} from '../../shared/_class/base-categoria-n.component'

@Component({
  selector: 'app-categoria-n',
  templateUrl: './categoria-n.component.html',
  styleUrls: ['./categoria-n.component.scss']
})
export class CategoriaNComponent extends BaseCategoriaNComponent  implements OnInit {


  //-------------------
  constructor(
    public _repository:  CategoriaNService,
    public _meta: Meta,
    public _titleMeta: Title,
    public _sharedVar:NomenclatrueVarService

    ) {
        super(_repository,_sharedVar)

    }

  ngOnInit(): void {

   super.ngOnInit();

    this._titleMeta.setTitle('XF-01  Ханская Комплектующие Мебель | цены в интернет-магазине | Доставка     ');
    this._meta.addTag({name: "description", content: "мебельная фурнитура для кухни спальни прихожей .Наполнение для шкафов и гардеробных комнат .XF-01  интернет-магазин недорогой Номенклатуры для мебели  . Оперативная  аккуратная доставка ."})
    this._meta.addTag({name: "keywords", content: "ханская  мебель корпусная заказ комплектующие форнитура цена  "})

  }

  public onSharedVarSet(item:CategoriaN){
  let i=<SEO_var>{id:item.id,decriptSEO:item.decriptSEO}

    this._sharedVar.SEO_let=i;


  }
}
//------------------------------

