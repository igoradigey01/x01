import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ProductDataService } from '../shared/sevices/product.servisce';
import {  Product } from '../../shared/_interfaces/product.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductDataService],
})
export class ProductComponent implements OnInit {
  _errorUotput: boolean = false;
  _error: any;



  _products: Product[]|null = null; //
  _katalogName:string='';
  _url_img:string='';



  constructor(
    private _repository: ProductDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this._url_img=this._repository.UrlImg;
    const katalogId: string|null = this.route.snapshot.paramMap.get('id');

    const id: number = Number(katalogId) || 0;
    this.route.queryParams.subscribe(
      (queryParam: any) => {
        this._katalogName = queryParam['katalog'];

      }
  );
    this._katalogName=''

    this.load(id);

     console.log("katalogs------"+ id);
  }


  // загрузить данные подКаталога по id
  private load(idKatalog: number) {
    this._repository.Products(idKatalog).subscribe(
      (d) => {
        this._products = d;
      },
      (err) => {
        console.log(err);
      }
    ); //13.03.21
  }
  //--------------------
}
