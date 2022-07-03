import { Component, OnInit, Input } from '@angular/core';

import { CategoriaN } from 'src/app/core-nomenclature/_interfaces/categoria-n.model';
import { CategoriaNService } from '../../shared/services/categoria-n.servise';
import { Meta, Title } from '@angular/platform-browser';
import { SharedVarService } from 'src/app/shared/services/shared-var.service';
import { SEO_var } from 'src/app/shared/_interfaces/SEO-var.models'
import { UserManagerService } from 'src/app/shared/services/user-manager.service';
import { ActivatedRoute, Router } from '@angular/router';import {BaseCategoriaNComponent} from '../../shared/_class/base-categoria-n.component'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-opt-categoria-n',
  templateUrl: './opt-categoria-n.component.html',
  styleUrls: ['./opt-categoria-n.component.scss']
})
export class OptCategoriaNComponent implements OnInit {

  private _subscriptions: Subscription[] = [];

  @Input() flagStyle: boolean = false;

  _categoriaNs: CategoriaN[] | null = null;


  //-------------------
  constructor(
    private repository: CategoriaNService,

    private sharedVar: SharedVarService,
    private _userManager: UserManagerService,
    private route: ActivatedRoute,
    private router:Router

  ) {



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



    this.redirect();

    this.repository.CategoriaNs().subscribe(
      (data) => {
        this._categoriaNs = data;
        console.log(this._categoriaNs);
      },
      (err) => console.log('load katalog err: --' + err)
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach((s) => s.unsubscribe());

  }



  private redirect(){
    //  debugger
       if(!this._userManager.IsShopperOpt){
         this.router.navigate(['/content-n'])

       }
     }
}
//------------------------------


