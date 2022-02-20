import { Component, OnInit } from '@angular/core';
import {StateView} from 'src/app/shared/_interfaces/state-view';

import { KatalogService } from '../../shared/sevices/katalog.service';
import { Katalog } from 'src/app/shared/_interfaces/katalog.model';
import {DtoKatalog} from '../katalog-item/katalog-item.component'


@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.scss'],
})
export class KatalogComponent implements OnInit {

  public _select_katalog: Katalog = <Katalog>{ id: -1, name: '',flag_href:false,flag_link:false,hidden:false };; //new Katalog(-1, ''); //выбор Kalog item
  public  _katalogs: Katalog[] | undefined ; // массив items katalog
  public _modul_name: string = '(менеджер)';
  public _router_link: string = '/manager';
  public _flagViewState:StateView=StateView.default;

  constructor(private _repository: KatalogService) {}

  ngOnInit(): void {
    this.loadKatalogs();
  }

  //----------------------

  loadKatalogs() {
    this._repository.Katalogs().subscribe((data) => (this._katalogs = data));
  }

  onChangeStateView(event:StateView){
    this._flagViewState = event;
    if (this._flagViewState == StateView.create) {
      this._select_katalog = <Katalog>{ id: -1, name: '',flag_href:false,flag_link:false,hidden:false };
    }

  }

  onChangedKatalog(event:DtoKatalog){
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

      this._select_katalog = item;

    this._flagViewState = StateView.edit;
   // this._flagDisplayAddButton = false;
  }
  //--------------------
  public onChangedCreate(event: StateView) {
    //debugger
    this._flagViewState = event;
    this.addItem();
  }

  public onChangedDefaultState(){
    //debugger
    this._flagViewState = StateView.default;
  }
 private addItem() {
  //  this._flagViewMode = 'create';
    this._select_katalog = <Katalog>{ id: -1, name: '' };
   // this._flagDisplayAddButton = false;
  }

  deleteItem() {
    this._repository.Delete(this._select_katalog.id).subscribe();

    let i = this._katalogs?.findIndex((d) => d.id === this._select_katalog.id);
    if (i) this._katalogs?.splice(i, 1);
    this.cancel();
  }

  saveItem() {
    if (this._flagViewState == StateView.create)
     {
      this._select_katalog.id = 0;
      this._repository
        .Create(this._select_katalog)
        .subscribe((data: Katalog) => this._katalogs?.push(data));
    }
    if(this._flagViewState == StateView.edit) {


      // при загрузке компонента мы подписались на GetKatalogs
      //this.loadKatalogs() Katalog[]
      // получаем ссылку на item в []Katalog _selectKatalog
      // нужно изменить данные только на сервере на клиенте именяются в результате привязки к _selectItem
      //и ссылки на item в  массиве


      this._repository.Update(this._select_katalog).subscribe();

    }

    this.cancel();
  }

  cancel() {
    this._flagViewState =StateView.default;
    //this._flagDisplayAddButton = true;
  }



}
