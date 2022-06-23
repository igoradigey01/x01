import { Component, OnInit } from '@angular/core';
import { BaseNomenclatureItemComponent } from '../../shared/_class/base-nomenclature-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NomenclatureService } from '../../shared/services/nomenclature.servise';
import { NomenclatrueVarService } from '../../shared/services/nomenclature-var.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { UserManagerService } from 'src/app/shared/services/user-manager.service';

@Component({
  selector: 'app-opt-nomenclature-item',
  templateUrl: './opt-nomenclature-item.component.html',
  styleUrls: ['./opt-nomenclature-item.component.scss'],
})
export class OptNomenclatureItemComponent
  extends BaseNomenclatureItemComponent

{
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public repository: NomenclatureService,
    public sharedVar: NomenclatrueVarService,
    public clipboard: Clipboard,
    private _userManager: UserManagerService
  ) {
    super(route, router, repository, sharedVar, clipboard);
  }

 /*  ngOnInit(): void {
    //  console.log("----- ngOnChanges opt-nomenclatureItem  parent --------");
    super.ngOnInit();
  } */

  public onBack() {
    if (this._isChildComponent) {
      this._onChangeBack.next();
      return;
    }
    if (this._nomenclature) {
      this.router.navigateByUrl(
        '/content-n/opt/optkatalog/' + this._nomenclature.katalogId
      );
    }
  }

  private redirect(idNomenclature: string | null) {
    //  debugger
    if (!this._userManager.IsShopperOpt) {
      this.router.navigate([
        '/content-n/categoria/katalog/nomenclature/' + idNomenclature,
      ]);
    }
  }
}
