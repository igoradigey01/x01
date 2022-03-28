import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Input, Output, EventEmitter } from '@angular/core';
import {StateView} from 'src/app/shared/_interfaces/state-view';
import { KatalogService } from     "../../shared/sevices/katalogProduct.service";                  //' shared/sevices/katalog.service';
import { Katalog } from 'src/app/shared/_interfaces/katalog.model';

export interface DtoKatalog {
  katalog: Katalog;
  flagViewState: StateView;
}


@Component({
  selector: 'app-katalog-item',
  templateUrl: './katalog-item.component.html',
  styleUrls: ['./katalog-item.component.scss']
})
export class KatalogItemComponent implements OnInit {

  @Output() public _onChangeStateView = new EventEmitter<StateView>();
  @Output() public _onKatalogChange = new EventEmitter<DtoKatalog>();
  @Input() public _select_katalog: Katalog | undefined;
  @Input() public _flagViewState: StateView | undefined;

  public _flag_sendServerData: boolean = false;


  public _flagInvalid: boolean = false;

  public _progress: number = 0;


  public _flagButtonShow: boolean = false;
  public _flagError: boolean = false;
  _errorMgs: string[] = [];

  public _showPrefix = true;

  public get IsCreateView(): boolean {
    return this._flagViewState == StateView.create ? false : true;
  }

  constructor(
    private _repository:KatalogService
  ) {
    this._select_katalog=<Katalog>{id:-1,name:'',flag_href:false,flag_link:false,hidden:false,decriptSEO:undefined,link:undefined,keywordsSEO:undefined}
   }

  ngOnInit(): void {
   // debugger

  }






  //--------------------------------
  public save(): void {

    this._flagInvalid = true;
    this._flag_sendServerData = true;
     // debugger
    this._errorMgs = [];
    if (this._flagViewState == StateView.create) {
      // --- start create--
      if(this._select_katalog){
        this._select_katalog.id = 0;
      this._repository.Create(this._select_katalog).subscribe(
        (data: HttpEvent<any>) => {
          //progress bar
          switch (data.type) {
            case HttpEventType.Sent:
           //   console.log('Sent-- запрос отправлен--UpdateProduct--'); // запрос отправлен
              break;
            case HttpEventType.UploadProgress:
              // do something
              if (data.total) {
                this._progress = Math.round((100 * data.loaded) / data.total);
            //    console.log('HttpEventType.UploadProgress--' + this._progress);
              }
              break;
            case HttpEventType.Response:
              console.log('---Finished-----');
              this._errorMgs = [];
              this._flagError = false;
              let d=  <Katalog>   data.body
                 this._onKatalogChange.emit(
                   <DtoKatalog>{ katalog:d,
                    flagViewState:StateView.create
                   }
                 );
                 this.OK();
              break;
          }
          // end progrss bar
        },
        (err:HttpErrorResponse) => {
          this._flagError = true;
      //--  this._flag_sendServerData = false;
        this._flagInvalid = false;
        if(err.status === 401){
          this._errorMgs.push("пользователь не авторизован,войдите на сайт")
          return;
        }
        if ( err.status == 400) {
          console.log(err.error);
          if (err.error.errors)
            this._errorMgs.push(err.error.errors);
          else
            this._errorMgs.push(err.error);
          return;
        }

        this._errorMgs.push('Ошибка {'+err.status+ '} -Сообщиете Администаратору Pесурса');

        }
      );

      return;
      //--- end create -------
      }
    }
    if (this._flagViewState == StateView.edit) {

      if(this._select_katalog){
      // ---- start edit -------
      this._repository.Update(this._select_katalog).subscribe(
        (data: HttpEvent<any>) => {
          //progress bar
          switch (data.type) {
            case HttpEventType.Sent:
              console.log('Sent-- запрос отправлен--UpdateProduct--'); // запрос отправлен
              break;
            case HttpEventType.UploadProgress:
              // do something
              if (data.total) {
                this._progress = Math.round((100 * data.loaded) / data.total);
                console.log('HttpEventType.UploadProgress--' + this._progress);
              }
              break;
            case HttpEventType.Response:
              console.log('---Finished-----');
              this._errorMgs =[];
              this._flagError = false;
              //03.02.22
              let d=  <Katalog>   data.body
              this._onKatalogChange.emit(
                <DtoKatalog>{ katalog:d,
                 flagViewState:StateView.edit
                }
              );
              //   window.location.replace(this._select_Product.rootImgSrc+'S'+this._select_Product.imgName+'.web');

              this.OK(); //15.03.21
              break;
          }
          // end progrss bar
        },
        (err:HttpErrorResponse) => {
          this._flagError = true;
          //--  this._flag_sendServerData = false;
            this._flagInvalid = false;

            if(err.status === 401){
              this._errorMgs.push("пользователь не авторизован,войдите на сайт")
              return;
            }
            if ( err.status == 400) {
              console.log(err.error);
              if (err.error.errors)
                this._errorMgs.push(err.error.errors);
              else
                this._errorMgs.push(err.error);
              return;
            }

            this._errorMgs.push('Ошибка {'+err.status+ '} -Сообщиете Администаратору Pесурса');

        }
      );
      return;
      }
      //--- end edit ---
    }

    // this._flagInvalid = true; //!!!!
  }

  public delete() {
    this._flagInvalid = true;
    this._flag_sendServerData = true;
     // debugger
    this._errorMgs = [];
    this._flagError = false;
    if(this._select_katalog){
    this._repository.Delete(this._select_katalog.id).subscribe(
      (data: HttpEvent<any>) => {
        //progress bar
        switch (data.type) {
          case HttpEventType.Sent:
            console.log('Sent-- запрос отправлен--UpdateProduct--'); // запрос отправлен
            break;

          case HttpEventType.Response:
            console.log('---Finished-----');
            this._errorMgs = [];
            this._flagError = false;
         //   let d=  <Katalog>   data.body
            this._onKatalogChange.emit(
              <DtoKatalog>{ katalog:this._select_katalog, //21.03.22
               flagViewState:StateView.delete
              }
            );
            this.OK();; //15.03.21
            break;
        }
        // end progrss bar
      },
      (err : HttpErrorResponse) => {
       // debugger

        this._flagError = true;
      //--  this._flag_sendServerData = false;
        this._flagInvalid = false;
        if(err.status === 401){
          this._errorMgs.push("пользователь не авторизован,войдите на сайт")
          return;
        }

        if ( err.status == 400) {
          console.log(err.error);
          if (err.error.errors)
            this._errorMgs.push(err.error.errors);
          else
            this._errorMgs.push(err.error);
          return;
        }

        this._errorMgs.push('Ошибка {'+err.status+ '} -Сообщиете Администаратору Pесурса');
      }
    );

    }

  }
  public cancel() {
    // debugger
    this._onChangeStateView.emit(StateView.default);
  }

  public undo() {
    //debugger
    this._flag_sendServerData = false;
  }
  public OK(){
   this._onChangeStateView.emit(StateView.default);

  }


}
