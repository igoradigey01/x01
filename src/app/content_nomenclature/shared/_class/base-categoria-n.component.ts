import { Component, OnInit } from '@angular/core';
import { CategoriaN} from 'src/app/core-nomenclature/_interfaces/categoria-n.model';
import { CategoriaNService} from '../../shared/services/categoria-n.servise';
import {NomenclatrueVarService} from '../../shared/services/nomenclature-var.service';



@Component({
  selector: 'base-app-categoria-n',
  template: ``,
  styleUrls: []
})
export class BaseCategoriaNComponent implements OnInit {


  _categoriaNs: CategoriaN[] | null = null;




 

  //-------------------
  constructor(
    public _repository:  CategoriaNService,
    public _sharedVar:NomenclatrueVarService,


    ) {



    }

  ngOnInit(): void {







    this._repository.CategoriaNs().subscribe(
      (data) => {
        this._categoriaNs = data;
        console.log(this._categoriaNs);
      },
      (err) => console.log('load katalog err: --' + err)
    );


  }


}
//------------------------------

