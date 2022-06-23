import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NomenclatureP } from '../../shared/_interfaces/NomenclatureP.model';

import { NomenclatrueVarService } from '../../shared/services/nomenclature-var.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { NomenclatureService } from '../../shared/services/nomenclature.servise'
import { BaseNomenclatureComponent } from '../../shared/_class/base-nomenclature.component'



@Component({
  selector: 'app-nomenclature',
  templateUrl: './nomenclature.component.html',
  styleUrls: ['./nomenclature.component.scss']
})
export class NomenclatureComponent extends BaseNomenclatureComponent {

  public parent_url:string='/content-n/categoria/'




  constructor(
    public sharedVar: NomenclatrueVarService,
    public route: ActivatedRoute,
    public router: Router,
    public meta: Meta,
    public titleMeta: Title,
    public repository: NomenclatureService,
  ) {
    super(sharedVar, route, router, meta, titleMeta, repository)
  }




 /*  public onBackInNavBar() {
    // debugger
    //console.log(" onBackInNavBar")
    if (this.sharedVar.IdCategoria !== -1)
      this.router.navigateByUrl('/content-n/categoria/' + this.sharedVar.IdCategoria);
    else {
      if (this._nomenclatures.length > 0)
        this.repository.KatalogN(this._nomenclatures[0].katalogId).subscribe(
          d => {
            console.log('onBackInNavBar ----- nomenclature')
            console.log(JSON.stringify(d))
            this.router.navigateByUrl('/content-n/categoria/' + d.categoriaId);

          }
        )



    }


  }*/



}
