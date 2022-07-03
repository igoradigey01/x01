import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KatalogN } from 'src/app/core-nomenclature/_interfaces/katalog-n.model';
import { KatalogNService } from '../../shared/services/katalog-n.service';
import { NomenclatrueVarService } from '../../shared/services/nomenclature-var.service';
import {BaseKatalogNComponent} from '../../shared/_class/base-katalog-n.component'
import { UserManagerService } from 'src/app/shared/services/user-manager.service';

@Component({
  selector: 'app-opt-katalog-n',
  templateUrl: './opt-katalog-n.component.html',
  styleUrls: ['./opt-katalog-n.component.scss'],
})
export class OptKatalogNComponent extends BaseKatalogNComponent implements OnInit {
  _katalogNs: KatalogN[] | undefined;
  _categoriaN_name: string = '';

  constructor(
    public repository: KatalogNService,
    public route: ActivatedRoute,
   public router: Router,
    public sharedVar: NomenclatrueVarService,
    private _userManager: UserManagerService
  ) {
    super(repository,route,router,sharedVar);
  }
  ngOnInit(){
    super.ngOnInit();
    this.redirect();

  }
  private redirect(){
    //  debugger
       if(!this._userManager.IsShopperOpt){
         this.router.navigate(['/content-n'])

       }
     }
  public onBackInNavBar() {
    console.log(" onBackInNavBar")
    this.router.navigateByUrl('/content-n/opt');

  }


}
