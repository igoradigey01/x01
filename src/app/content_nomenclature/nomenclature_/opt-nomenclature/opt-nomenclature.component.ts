import { Component, OnInit, SimpleChanges } from '@angular/core';
import { BaseNomenclatureComponent } from '../../shared/_class/base-nomenclature.component'
import { NomenclatrueVarService } from '../../shared/services/nomenclature-var.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { NomenclatureService } from '../../shared/services/nomenclature.servise'
import { UserManagerService } from 'src/app/shared/services/user-manager.service';



@Component({
  selector: 'app-opt-nomenclature',
  templateUrl: './opt-nomenclature.component.html',
  styleUrls: ['./opt-nomenclature.component.scss']
})
export class OptNomenclatureComponent extends BaseNomenclatureComponent implements OnInit {

  public _katalogN_id:number=-1;
  public parent_url:string='/content-n/opt/'




  constructor(
    public sharedVar: NomenclatrueVarService,
    public route: ActivatedRoute,
    public router: Router,
    public meta: Meta,
    public titleMeta: Title,
    public repository: NomenclatureService,
    public _userManager: UserManagerService
  ) { super(sharedVar, route, router, meta, titleMeta, repository) }



  ngOnInit(): void {
    // console.log("----- ngOnChanges nomenclatureItem  parent --------");
    super.ngOnInit();
    this.redirect(this._katalogN_id);
  }

  private redirect(idKatlog: number) {
    //  debugger
    if (!this._userManager.IsShopperOpt) {
      this.router.navigate(['/content-n/categoria/katalog/' + idKatlog])

    }
  }

}

