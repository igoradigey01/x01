import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserManagerService } from 'src/app/shared/sevices/user-manager.service';
import { ActivatedRoute } from '@angular/router';
import { KatalogService } from './../shared/sevices/katalog.service';
import { Katalog } from '../../shared/_interfaces/katalog.model';

@Component({
  selector: 'app-opt-katalog',
  templateUrl: './opt-katalog.component.html',
  styleUrls: ['./opt-katalog.component.scss']
})
export class OptKatalogComponent implements OnInit {

  private _subscriptions: Subscription[] = [];
 // @Input() flagStyle: boolean = false;

  katalogs: Katalog[] | null = null;

  constructor(
    private repository: KatalogService,
    private _userManager: UserManagerService,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    let subFlagShopperOpt = this._userManager.FlagShopperOpt$.subscribe();
    this._subscriptions.push(subFlagShopperOpt);
    this.route.queryParams.subscribe((queryParam: any) => {
     let param = queryParam['user'];
     if(param&&param==='opt1'){
       this._userManager.setVarShopperOpt();
       this._userManager.setFlagShopperOpt$(true);

     }
    });
    this.repository.Katalogs().subscribe(
      (data) => {
        this.katalogs = data;
        console.log(this.katalogs);
      },
      (err) => console.log('load katalog err: --' + err)
    );

  }
  ngOnDestroy() {
    this._subscriptions.forEach((s) => s.unsubscribe());

  }

}
