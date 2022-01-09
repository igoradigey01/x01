import { Component, OnInit } from '@angular/core';
import {Product} from 'src/app/shared/_interfaces/product.model'

@Component({
  selector: 'app-img-render',
  templateUrl: './img-render.component.html',
  styleUrls: ['./img-render.component.scss']
})
export class ImgRenderComponent implements OnInit {

  public _select_Product:Product=<Product>{id:-1,katalogId:-1,typeProductId:-1,name:''}
  public _flag_ng_template:boolean=false;
  public _flagPhoto:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }
   public onSetFilePhoto(event:any){

   }
}
