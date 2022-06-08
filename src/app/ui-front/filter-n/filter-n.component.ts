import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Nomenclature } from 'src/app/_shared/_interfaces/nomenclature.model';
import { Color } from 'src/app/_shared/_interfaces/color.model';
import { Brand } from 'src/app/_shared/_interfaces/brand.model';
import { Article } from 'src/app/_shared/_interfaces/article.model';

export interface FilterN{
  brandId: number;
  brandName?: string;
  colorId:number;
  colorName?:string;
  articleId:number;
  articleName?:string;
  nameFind:string;
}

export interface DtoFilterN {
  nomenclatures: Nomenclature[];
  flag: boolean;
}



@Component({
  selector: 'app-filter-n',
  templateUrl: './filter-n.component.html',
  styleUrls: ['./filter-n.component.scss']
})
export class FilterNComponent implements OnInit {

  public _flag_ShowFilter:boolean=false;
  public _select_FilterN:FilterN={brandId:-1,colorId:-1,articleId:-1,nameFind:''}
  public _button_name:string="Фильтр"

  @Input() public _articles: Article[] = [];
  @Input() public _brands: Brand[] = [];
  @Input() public _colors: Color[] = [];
  @Input() public _oldNomenclatures: Nomenclature[] = [];
  @Output() public _onFilterNomenclatureChange = new EventEmitter<DtoFilterN>();

  private _nomenclatures:Nomenclature[]=[];

  constructor() { }

  ngOnInit(): void {

  }
 public onShowFilterChange(){
   this._flag_ShowFilter=!this._flag_ShowFilter;
   this._button_name="Сброс";
   if(this._flag_ShowFilter===false){
     this._onFilterNomenclatureChange.next({flag:true,nomenclatures:this._oldNomenclatures});
   //  console.log(this._oldNomenclatures.length+"---._oldNomenclatures.length--FilterNComponent--Фильтр")
     this._button_name="Фильтр";
   }

 }
 public onBrandChange(event: any) {
  //debugger
  //console.log('Book changed...');
  let selectedIdBrand = +event.value;
  this._select_FilterN.brandId=selectedIdBrand;

  this._select_FilterN.brandName = this._brands.find(
    (d) => d.id === this._select_FilterN.brandId
  )?.name;
  this.FilterNomenclatures();
}

public onColorChange(event: any) {
  let selectedIdColor = +event.value;
  this._select_FilterN.colorId=selectedIdColor;

  this._select_FilterN.colorName = this._colors.find(
    (d) => d.id === this._select_FilterN.colorId
  )?.name;
  this.FilterNomenclatures();
}

public onArticleChange(event: any) {
  let selectedIdArticle = +event.value;
  this._select_FilterN.articleId=selectedIdArticle;

  this._select_FilterN.articleName = this._articles.find(
    (d) => d.id === this._select_FilterN.articleId
  )?.name;
  this.FilterNomenclatures();
}

public onNameFindChange(val:string){
 // console.log(val+"--val");
 // console.log(this._select_FilterN.nameFind);
 this.FilterNomenclatures();

}

private FilterNomenclatures(){
   //  debugger

  this._nomenclatures=[];
  let flag=false;

  if(this._select_FilterN.articleId===-2||this._select_FilterN.brandId===-2||this._select_FilterN.colorId===-2){
    this._nomenclatures=[...this._oldNomenclatures];
     flag=true;
  }



  if(this._select_FilterN.articleId===-1||this._select_FilterN.articleId===-2){



  }
  else{

    this._nomenclatures= this._oldNomenclatures.filter(d=>d.articleId===this._select_FilterN.articleId)
   flag=true;


  }

  //-----------------------------------------------
  if(this._select_FilterN.brandId===-1||this._select_FilterN.brandId===-2){

  }
  else{
   if(!flag){
   this._nomenclatures= this._oldNomenclatures.filter(d=>d.brandId===this._select_FilterN.brandId)
  //  console.log(this._oldNomenclatures.length+"---._oldNomenclatures.length--FilterNComponent")
  //  console.log(this._nomenclatures.length+"---._nomenclatures.length--FilterNComponent")
   flag=true;

   }else{
    this._nomenclatures=this._nomenclatures.filter(d=>d.brandId===this._select_FilterN.brandId)

   }
  }

  if(this._select_FilterN.colorId===-1||this._select_FilterN.colorId===-2){

  }
  else{
   if(!flag){
   this._nomenclatures= this._oldNomenclatures.filter(d=>d.colorId===this._select_FilterN.colorId)
   flag=true;

   }else{

    this._nomenclatures=this._nomenclatures.filter(d=>d.colorId===this._select_FilterN.colorId)

   }

  }

  //-------------- find in name
  if(!flag){
    this._nomenclatures= this._oldNomenclatures.filter(d=>d.name.includes(this._select_FilterN.nameFind))
      flag=true;
  }
  else{
    this._nomenclatures= this._nomenclatures.filter(d=>d.name.includes(this._select_FilterN.nameFind))

  }

  if(flag) this._onFilterNomenclatureChange.next({flag:true,nomenclatures:this._nomenclatures});

}
}
