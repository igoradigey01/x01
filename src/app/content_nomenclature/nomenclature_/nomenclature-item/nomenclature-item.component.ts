import { Component, OnInit   } from '@angular/core';
import {BaseNomenclatureItemComponent} from '../../shared/_class/base-nomenclature-item.component'
import { ActivatedRoute, Router } from '@angular/router';
import { NomenclatureService } from '../../shared/services/nomenclature.servise'
import { NomenclatrueVarService } from '../../shared/services/nomenclature-var.service';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-nomenclature-item',
  templateUrl: './nomenclature-item.component.html',
  styleUrls: ['./nomenclature-item.component.scss']
})
export class NomenclatureItemComponent  extends BaseNomenclatureItemComponent  {



 // public _flagShowQRcode: boolean = false;








  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public repository: NomenclatureService,
    public sharedVar: NomenclatrueVarService,
    public clipboard: Clipboard
  ) {
    super(route ,router,repository,sharedVar,clipboard);


   }


  /*  ngOnInit(): void {
   // console.log("----- ngOnChanges nomenclatureItem  parent --------");
    super.ngOnInit();
  } */




  public onBack() {
    if (this._isChildComponent) {
      this._onChangeBack.next();
      return;
    }
    if (this._nomenclature) {
      this.router.navigateByUrl('/content-n/categoria/katalog/' + this._nomenclature.katalogId);
    }
  }

}
