import { Component, OnInit } from '@angular/core';
import {StateView} from 'src/app/shared/_interfaces/state-view';

import { KatalogService } from '../../shared/sevices/katalogProduct.service';
import { Katalog } from 'src/app/shared/_interfaces/katalog.model';
import {DtoKatalog} from '../katalog-item/katalog-item.component'


@Component({
  selector: 'app-katalog-main',
  templateUrl: './katalog-main.component.html',
  styleUrls: ['./katalog-main.component.scss'],
})
export class KatalogMainComponent implements OnInit {

  public _select_katalog: Katalog = <Katalog>{ id: -1, name: '',flag_href:false,flag_link:false,hidden:false };; //new Katalog(-1, ''); //выбор Kalog item
  public  _katalogs: Katalog[] | undefined ; // массив items katalog
  public _modul_name: string = '(менеджер)';
  public _router_link: string = '/manager';
  public _flagViewState:StateView=StateView.default;

  constructor(private _repository: KatalogService) {}

  ngOnInit(): void {
   // debugger
    this.loadKatalogs();
  }

  //----------------------

public  loadKatalogs() {
    this._repository.Katalogs().subscribe((data) => (this._katalogs = data));
  }

public  onChangeStateView(event:StateView){
 // debugger
    this._flagViewState = event;
    if (this._flagViewState == StateView.create) {
      this._select_katalog = <Katalog>{ id: -1, name: '',flag_href:false,flag_link:false,hidden:false };
    }

  }

public  onChangedKatalog(event:DtoKatalog){
    if(event.flagViewState==StateView.create){
      if(this._katalogs)
      this._katalogs.push(event.katalog);
    }
    if(event.flagViewState==StateView.delete)
    {
      if(this._katalogs){
     let index= this._katalogs.findIndex(f=>f.id==event.katalog.id);
      this._katalogs.splice(index,index+1);
     // console.log(JSON.stringify( this._products));
      }
    }

  }

  changeCategory(item: Katalog) {
   // debugger
      this._select_katalog = item;

    this._flagViewState = StateView.edit;
   // this._flagDisplayAddButton = false;
  }
  //--------------------


  public onChangedDefaultState(){
    //debugger
    this._flagViewState = StateView.default;
  }






  cancel() {
    this._flagViewState =StateView.default;
    //this._flagDisplayAddButton = true;
  }



}
