import { Component, OnInit } from '@angular/core';
import {StateView} from 'src/app/shared/_interfaces/state-view';
import {Material} from 'src/app/shared/_interfaces/material.model'
import {MaterialProductService} from '../../shared/sevices/material.service'
import { DtoMaterial } from '../item-material/item-material.component';

@Component({
  selector: 'app-main-material',
  templateUrl: './main-material.component.html',
  styleUrls: ['./main-material.component.scss']
})
export class MainMaterialComponent implements OnInit {

  public _select_materialProduct: Material = <Material>{ id: -1, name: '',flag_href:false,flag_link:false,hidden:false };; //new Katalog(-1, ''); //выбор Kalog item
  public  _materialProducts: Material[] | undefined ; // массив items materialProduct
  public _modul_name: string = '(менеджер)';
  public _router_link: string = '/manager';
  public _flagViewState:StateView=StateView.default;

  constructor(private _repository: MaterialProductService) {}

  ngOnInit(): void {
    this.loadMaterials();
  }

  //----------------------

public  loadMaterials() {
    this._repository.MaterialProducts().subscribe((data) => (this._materialProducts = data));
  }

public  onChangeStateView(event:StateView){
 // debugger
    this._flagViewState = event;
    if (this._flagViewState == StateView.create) {
      this._select_materialProduct = <Material>{ id: -1, name: '',flag_href:false,flag_link:false,hidden:false };
    }

  }

public  onChangedMaterial(event:DtoMaterial){
    if(event.flagViewState==StateView.create){
      if(this._materialProducts)
      this._materialProducts.push(event.materialProduct);
    }
    if(event.flagViewState==StateView.delete)
    {
      if(this._materialProducts){
     let index= this._materialProducts.findIndex(f=>f.id==event.materialProduct.id);
      this._materialProducts.splice(index,index+1);
     // console.log(JSON.stringify( this._products));
      }
    }

  }

  changePosition(item:Material) {
   // debugger
      this._select_materialProduct = item;

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
