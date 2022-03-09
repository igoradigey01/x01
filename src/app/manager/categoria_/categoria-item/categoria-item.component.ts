import { Component, OnInit } from '@angular/core';
import {Categoria} from 'src/app/shared/_interfaces/categoria.modil';
import {StateView} from 'src/app/shared/_interfaces/state-view';
import { CategoriaProductService} from '../../shared/sevices/categoriaProduct.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Input, Output, EventEmitter } from '@angular/core';

export interface DtoCategoria {
  categoriaProduct: Categoria;
  flagViewState: StateView;
}

@Component({
  selector: 'app-categoria-item',
  templateUrl: './categoria-item.component.html',
  styleUrls: ['./categoria-item.component.scss']
})
export class CategoriaItemComponent implements OnInit {


  @Output() public _onChangeStateView = new EventEmitter<StateView>();
  @Output() public _onCategoriaChange = new EventEmitter<DtoCategoria>();
  @Input() public _select_categoria:Categoria | undefined;
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

  constructor(private _repository: CategoriaProductService) {
    this._select_categoria = <Categoria>{
      id: -1,
      name: '',
      hidden: false,
      description:undefined
    };
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
      if (this._select_categoria) {
        this._select_categoria.id = 0;
        this._repository.Create(this._select_categoria).subscribe(
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
                let d = <Categoria>data.body;
                this._onCategoriaChange.emit(<DtoCategoria>{
                  categoriaProduct: d,
                  flagViewState: StateView.create,
                });
                this.OK();
                break;
            }
            // end progrss bar
          },
          (err: HttpErrorResponse) => {
            this._flagError = true;
            //--  this._flag_sendServerData = false;
            this._flagInvalid = false;
            if (err.status === 401) {
              this._errorMgs.push(
                'пользователь не авторизован,войдите на сайт'
              );
              return;
            }
            if (err.status == 400) {
              console.log(err.error);
              if (err.error.errors) this._errorMgs.push(err.error.errors);
              else this._errorMgs.push(err.error);
              return;
            }

            this._errorMgs.push(
              'Ошибка {' + err.status + '} -Сообщиете Администаратору Pесурса'
            );
          }
        );

        return;
        //--- end create -------
      }
    }
    if (this._flagViewState == StateView.edit) {
      if (this._select_categoria) {
        // ---- start edit -------
        this._repository.Update(this._select_categoria).subscribe(
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
                  console.log(
                    'HttpEventType.UploadProgress--' + this._progress
                  );
                }
                break;
              case HttpEventType.Response:
                console.log('---Finished-----');
                this._errorMgs = [];
                this._flagError = false;
                //03.02.22
                let d = <Categoria>data.body;
                this._onCategoriaChange.emit(<DtoCategoria>{
                  categoriaProduct: d,
                  flagViewState: StateView.edit,
                });
                //   window.location.replace(this._select_Product.rootImgSrc+'S'+this._select_Product.imgName+'.web');

                this.OK(); //15.03.21
                break;
            }
            // end progrss bar
          },
          (err: HttpErrorResponse) => {
            this._flagError = true;
            //--  this._flag_sendServerData = false;
            this._flagInvalid = false;

            if (err.status === 401) {
              this._errorMgs.push(
                'пользователь не авторизован,войдите на сайт'
              );
              return;
            }
            if (err.status == 400) {
              console.log(err.error);
              if (err.error.errors) this._errorMgs.push(err.error.errors);
              else this._errorMgs.push(err.error);
              return;
            }

            this._errorMgs.push(
              'Ошибка {' + err.status + '} -Сообщиете Администаратору Pесурса'
            );
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
    if (this._select_categoria) {
      this._repository.Delete(this._select_categoria.id).subscribe(
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
              let d = <Categoria>data.body;
              this._onCategoriaChange.emit(<DtoCategoria>{
                categoriaProduct: d,
                flagViewState: StateView.delete,
              });

              this.OK(); //15.03.21
              break;
          }
          // end progrss bar
        },
        (err: HttpErrorResponse) => {
          // debugger

          this._flagError = true;
          //--  this._flag_sendServerData = false;
          this._flagInvalid = false;
          if (err.status === 401) {
            this._errorMgs.push('пользователь не авторизован,войдите на сайт');
            return;
          }

          if (err.status == 400) {
            console.log(err.error);
            if (err.error.errors) this._errorMgs.push(err.error.errors);
            else this._errorMgs.push(err.error);
            return;
          }

          this._errorMgs.push(
            'Ошибка {' + err.status + '} -Сообщиете Администаратору Pесурса'
          );
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
  public OK() {
    this._onChangeStateView.emit(StateView.default);
  }
}

