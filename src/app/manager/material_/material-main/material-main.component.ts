import { Component, OnInit } from '@angular/core';
import {StateView} from 'src/app/shared/_interfaces/state-view';
import {Material} from 'src/app/shared/_interfaces/material.model'
import {MaterialProductService} from '../../shared/sevices/materialProduct.service'
import { DtoMaterial } from '../material-item/material-item.component';

@Component({
  selector: 'app-main-material',
  templateUrl: './material-main.component.html',
  styleUrls: ['./material-main.component.scss']
})
export class MaterialMainComponent implements OnInit {

  public _select_material: Material = <Material>{ id: -1, name: '',hidden:false ,description:''};
  public  _materials: Material[] | undefined ; // массив items materialProduct
  public _modul_name: string = '(менеджер)';
  public _router_link: string = '/manager';
  public _flagViewState:StateView=StateView.default;

  constructor(private _repository: MaterialProductService) {}

  ngOnInit(): void {
    this.loadMaterials();
  }

  //----------------------

public  loadMaterials() {
    this._repository.MaterialPs().subscribe((data) => (this._materials = data));
  }

public  onChangeStateView(event:StateView){
 // debugger
    this._flagViewState = event;
    if (this._flagViewState == StateView.create) {
      this._select_material = <Material>{ id: -1, name: '',flag_href:false,flag_link:false,hidden:false };
    }

  }

public  onChangedMaterial(event:DtoMaterial){
    if(event.flagViewState==StateView.create){
      if(this._materials)
      this._materials.push(event.materialProduct);
    }
    if(event.flagViewState==StateView.delete)
    {
      if(this._materials){
     let index= this._materials.findIndex(f=>f.id==event.materialProduct.id);
      this._materials.splice(index,index+1);
     // console.log(JSON.stringify( this._products));
      }
    }

  }

  changePosition(item:Material) {
   // debugger
      this._select_material = item;

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
