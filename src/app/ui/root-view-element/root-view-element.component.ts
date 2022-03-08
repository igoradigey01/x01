import { Component, OnInit } from '@angular/core';
import {StateView} from 'src/app/shared/_interfaces/state-view';
import { Katalog } from 'src/app/shared/_interfaces/katalog.model';

import { EventEmitter, Input, Output} from '@angular/core';

 export interface Item{
  id:number;
  name:string;
}

@Component({
  selector: 'app-root-view-element',
  templateUrl: './root-view-element.component.html',
  styleUrls: ['./root-view-element.component.scss']
})
export class RootViewElementComponent implements OnInit {

  public  _flagViewState:StateView=StateView.default;

  @Input() public _modul_name:string=""
  @Input() public _router_link:string="";

  @Output() onChangedViewMode = new EventEmitter<StateView>();
  @Output() onClickKatalog=new EventEmitter();

  @Input()  public _selectedKagalog:any = <Item>{ id: -1, name: '' }

  constructor() { }

  ngOnInit(): void {
  }

  public cancel():void {
    this._flagViewState = StateView.default;
    this.onChangedViewMode.emit(this._flagViewState);
    this.onClickKatalog.emit();

  }

  public addItem():void {
    this._flagViewState = StateView.create;
    this._selectedKagalog = <Katalog>{ id: -1, name: '' };
    this.onChangedViewMode.emit(this._flagViewState);

  }

  public get DistplayButton():boolean{
    if(this._flagViewState==StateView.create)return true;
    return this._flagViewState==StateView.default?true:false;
  }

}
