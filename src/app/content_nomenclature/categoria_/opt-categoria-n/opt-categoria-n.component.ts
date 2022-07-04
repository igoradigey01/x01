import { Component, OnInit, Input } from '@angular/core';

import { CategoriaN } from 'src/app/core-nomenclature/_interfaces/categoria-n.model';
import { CategoriaNService } from '../../shared/services/categoria-n.servise';
import { NomenclatrueVarService } from '../../shared/services/nomenclature-var.service';
import { UserManagerService } from 'src/app/shared/services/user-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseCategoriaNComponent } from '../../shared/_class/base-categoria-n.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-opt-categoria-n',
  templateUrl: './opt-categoria-n.component.html',
  styleUrls: ['./opt-categoria-n.component.scss'],
})
export class OptCategoriaNComponent  extends BaseCategoriaNComponent  implements OnInit {

  private _subscriptions: Subscription[] = [];

  //public _categoriaNs: CategoriaN[] | null = null;

  //-------------------
  constructor(
    public repository: CategoriaNService,
    public sharedVar: NomenclatrueVarService,
    public _userManager: UserManagerService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(repository, sharedVar);
  }

  ngOnInit(): void {
    let subFlagShopperOpt = this._userManager.FlagShopperOpt$.subscribe();
    this._subscriptions.push(subFlagShopperOpt);

    this.route.queryParams.subscribe((queryParam: any) => {
      let param = queryParam['user'];
      if (param && param === 'opt1') {
        this._userManager.setVarShopperOpt();
        this._userManager.setFlagShopperOpt$(true);
      }
    });

    if (!this._userManager.IsShopperOpt) {
      this.redirect();
    } else super.ngOnInit();
  }

  ngOnDestroy() {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }

  private redirect() {
    //  debugger

    this.router.navigate(['/content-n']);
  }
}
//------------------------------
