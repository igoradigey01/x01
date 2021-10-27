import { Component, OnInit } from '@angular/core';

import { KatalogDataService } from './../../data-model/katalog-data.service';
import { Katalog } from './../../data-model/class-data.model';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.css']

})
export class KatalogComponent implements OnInit {
  public _selectedKagalog: Katalog = new Katalog(-1, ''); //выбор Kalog item

  //-----------------------------------
  //_katalog: Katalog =null;    // new Katalog(-1,'');   // изменяемый item Katlog
  _katalogs: Katalog[] = null; // массив items katalog
  _flagViewMode: string = 'default'; // табличный режим
  _flagFocus: boolean = true;
  _flagDisplayAddButton:boolean=true;

  constructor(private _repository: KatalogDataService) {}

  ngOnInit(): void {
    this.loadKatalogs();
  }

  //----------------------

  loadKatalogs() {
    this._repository.GetKatalogs().subscribe((data) => (this._katalogs = data));
  }

  changeCategory(item?: Katalog) {
    this._selectedKagalog = item;
    this._flagViewMode = 'edit';
    this._flagDisplayAddButton=false;
   
  }
  //--------------------

  addItem() {
    this._flagViewMode = 'create';
    this._selectedKagalog = new Katalog(-1, '');
    this._flagDisplayAddButton=false;

  }

  deleteItem() {
    this._repository
      .DeleteKatalog(this._selectedKagalog.id)
      .subscribe();
let index=    this._katalogs.findIndex(d=>d.id===this._selectedKagalog.id);
 this._katalogs.splice(index,1);
    this.cancel();
  }

  saveItem() {
    if (this._selectedKagalog.id == -1) {
      this._selectedKagalog.id = 0;
      this._repository
        .CreateKatalog(this._selectedKagalog)
        .subscribe((data: Katalog) => this._katalogs.push(data));
    } else {
      // let itemKatalog:Katalog=new Katalog(-1,"test");

      // при загрузке компонента мы подписались на GetKatalogs
      //this.loadKatalogs() Katalog[]
      // получаем ссылку на item в []Katalog _selectKatalog
      // нужно изменить данные только на сервере на клиенте именяются в результате привязки к _selectItem
      //и ссылки на item в  массиве
      //

      this._repository.UpdateKatalog(this._selectedKagalog).subscribe();

      /*
      этого делать не надо в массиве элемент уже изменен =изменить только на сервере
          (d: Katalog) => {

        //  console.log('item.name==' + item.name  );  //---' + 'd.name==' + d.name);
          itemKatalog = d;

          //  this.loadKatalogs()--18.04.21
        });

        let item = this._katalogs.find((i) => {
          i.id == itemKatalog.id;
        });
    console.log(itemKatalog.name);
    */
      //  item.name=itemKatalog.name;
    }

    this.cancel();
  }

  cancel() {
    this._flagViewMode = 'default';
    this._flagDisplayAddButton=true;
  }
}
