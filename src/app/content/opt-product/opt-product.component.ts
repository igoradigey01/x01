import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductDataService } from '../shared/sevices/product.servisce';
import { Product } from '../../shared/_interfaces/product.model';

@Component({
  selector: 'app-opt-product',
  templateUrl: './opt-product.component.html',
  styleUrls: ['./opt-product.component.scss'],
})
export class OptProductComponent implements OnInit {
  _errorUotput: boolean = false;
  _error: any;
  _products: Product[] | null = null; //
  _katalogName: string = '';
  _url_img: string = '';

  constructor(
    private _repository: ProductDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const katalogId: string | null = this.route.snapshot.paramMap.get('id');
    const id: number = Number(katalogId) || 0;
    this.route.queryParams.subscribe((queryParam: any) => {
      this._katalogName = queryParam['katalog'];
    });
    this.Load(id, this._katalogName);
  }
  private Load(idKatalog: number, katalogName: string): void {
    this._repository.Products(idKatalog, katalogName).subscribe(
      (d) => {
        this._products = d;
      },
      (err) => {
        console.log(err);
      }
    ); //13.03.21
  }
}
