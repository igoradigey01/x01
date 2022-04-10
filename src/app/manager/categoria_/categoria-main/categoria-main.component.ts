import { Component, OnInit } from '@angular/core';
import {StateView} from 'src/app/shared/_interfaces/state-view';
import {Categoria} from 'src/app/shared/_interfaces/categoria.model'
import {CategoriaProductService} from '../../shared/sevices/categoriaProduct.service'
import { DtoCategoria } from '../categoria-item/categoria-item.component';

@Component({
  selector: 'app-categoria-main',
  templateUrl: './categoria-main.component.html',
  styleUrls: ['./categoria-main.component.scss']
})
export class CategoriaMainComponent implements OnInit {


  public _select_categoria: Categoria = <Categoria>{ id: -1, name: '',hidden:false,description:'' };; //new Katalog(-1, ''); //выбор Kalog item
  public  _categorias:Categoria[] | undefined ; // массив items materialProduct
  public _modul_name: string = '(менеджер)';
  public _router_link: string = '/manager';
  public _flagViewState:StateView=StateView.default;

  constructor(private _repository: CategoriaProductService) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  //----------------------

public  loadCategorias() {
    this._repository.CategoriaPs().subscribe((data) => (this._categorias = data));
  }

public  onChangeStateView(event:StateView){
 // debugger
    this._flagViewState = event;
    if (this._flagViewState == StateView.create) {
      this._select_categoria = <Categoria>{ id: -1, name: '',hidden:false ,description:''};
    }

  }

public  onChangedCategoria(event:DtoCategoria){
    if(event.flagViewState==StateView.create){
      if(this._categorias)
      this._categorias.push(event.categoriaProduct);
    }
    if(event.flagViewState==StateView.delete)
    {
      if(this._categorias){
     let index= this._categorias.findIndex(f=>f.id==event.categoriaProduct.id);
      this._categorias.splice(index,index+1);
     // console.log(JSON.stringify( this._products));
      }
    }

  }

  changePosition(item:Categoria) {
   // debugger
      this._select_categoria = item;

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

