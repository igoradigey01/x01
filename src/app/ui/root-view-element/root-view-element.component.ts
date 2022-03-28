import { Component, OnInit } from '@angular/core';
import {StateView} from 'src/app/shared/_interfaces/state-view';
import { KatalogUI } from '../shared/_interfaces/katalog.model';
import { UserManagerService } from 'src/app/shared/services/user-manager.service';
import { Subscription } from 'rxjs';
import { EventEmitter, Input, Output} from '@angular/core';
import {  Router } from '@angular/router'

 export interface Item{
  id:number;
  name:string;
}

@Component({
  selector: 'app-root-view-element',
  templateUrl: './root-view-element.component.html',
  styleUrls: ['./root-view-element.component.scss']
})
export class RootViewElementComponent implements OnInit {

  private _subscriptions: Subscription[] = [];

  public _invalidLogin: boolean = false;
 // public _flag_invalidLogin=false;

  public  _flagViewState:StateView=StateView.default;

  @Input() public _modul_name:string=""
  @Input() public _router_link:string="";

  @Output() onChangedViewMode = new EventEmitter<StateView>();
  @Output() onClickKatalogUI=new EventEmitter();

  @Input()  public _selectedKagalogUI:any = <Item>{ id: -1, name: '' }

  constructor(
    private userManager: UserManagerService,
    private router : Router
  ) {

    //debugger
    let sub1=  this.userManager.InvalidLogin$.subscribe(
      d => { this._invalidLogin = d;

           });

    let sub2=  this.userManager.InvalidTimeAccess_token$.subscribe(
      d => {
        this._invalidLogin = d;

      //  console.log("RootViewElementComponent--this.userManager.InvalidTimeAccess_token$--")
        if(d) this.routedLogins();
      }
    );
    this._subscriptions.push(sub1);
    this._subscriptions.push(sub2);
   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._subscriptions
      .forEach(s => s.unsubscribe());
  }

  public cancel():void {
    this._flagViewState = StateView.default;
    this.onChangedViewMode.emit(this._flagViewState);
    this.onClickKatalogUI.emit();

  }

  public addItem():void {
    this._flagViewState = StateView.create;
    this._selectedKagalogUI = <KatalogUI>{ id: -1, name: '' };
    this.onChangedViewMode.emit(this._flagViewState);

  }

  public get DistplayButton():boolean{
    if(this._flagViewState==StateView.create)return true;
    return this._flagViewState==StateView.default?true:false;
  }

  private routedLogins(){
    this.router.navigate(['/account']);
  }

}
