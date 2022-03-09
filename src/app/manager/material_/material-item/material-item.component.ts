import { Component, OnInit } from '@angular/core';
import { StateView } from 'src/app/shared/_interfaces/state-view';
import { Material } from 'src/app/shared/_interfaces/material.model';
import { MaterialProductService } from '../../shared/sevices/materialProduct.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Input, Output, EventEmitter } from '@angular/core';



export interface DtoMaterial {
  materialProduct: Material;
  flagViewState: StateView;
}

@Component({
  selector: 'app-material-item',
  templateUrl: './material-item.component.html',
  styleUrls: ['./material-item.component.scss'],
})
export class MaterialItemComponent implements OnInit {
  @Output() public _onChangeStateView = new EventEmitter<StateView>();
  @Output() public _onMaterialChange = new EventEmitter<DtoMaterial>();
  @Input() public _select_material: Material | undefined;
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

  constructor(private _repository: MaterialProductService) {
    this._select_material = <Material>{
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
      if (this._select_material) {
        this._select_material.id = 0;
        this._repository.Create(this._select_material).subscribe(
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
                let d = <Material>data.body;
                this._onMaterialChange.emit(<DtoMaterial>{
                  materialProduct: d,
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
      if (this._select_material) {
        // ---- start edit -------
        this._repository.Update(this._select_material).subscribe(
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
                let d = <Material>data.body;
                this._onMaterialChange.emit(<DtoMaterial>{
                  materialProduct: d,
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
    if (this._select_material) {
      this._repository.Delete(this._select_material.id).subscribe(
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
              let d = <Material>data.body;
              this._onMaterialChange.emit(<DtoMaterial>{
                materialProduct: d,
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
