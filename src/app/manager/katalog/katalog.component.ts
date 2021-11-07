import { Component, OnInit } from '@angular/core';

import { KatalogService } from './../shared/sevices/katalog.service';
import { Katalog } from 'src/app/shared/_interfaces/katalog.model';
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
  styleUrls: ['./katalog.component.scss'],
})
export class KatalogComponent implements OnInit {
  public _selectedKagalog: Katalog = <Katalog>{ id: -1, name: '' }; //new Katalog(-1, ''); //выбор Kalog item

  //-----------------------------------
  //_katalog: Katalog =null;    // new Katalog(-1,'');   // изменяемый item Katlog
  _katalogs: Katalog[] | null = null; // массив items katalog
  _flagViewMode: string = 'default'; // табличный режим
  _flagFocus: boolean = true;
  _flagDisplayAddButton: boolean = true;

  constructor(private _repository: KatalogService) {}

  ngOnInit(): void {
    this.loadKatalogs();
  }

  //----------------------

  loadKatalogs() {
    this._repository.Katalogs().subscribe((data) => (this._katalogs = data));
  }

  changeCategory(item: Katalog) {

      this._selectedKagalog = item;
    
    this._flagViewMode = 'edit';
    this._flagDisplayAddButton = false;
  }
  //--------------------

  addItem() {
    this._flagViewMode = 'create';
    this._selectedKagalog = <Katalog>{ id: -1, name: '' };
    this._flagDisplayAddButton = false;
  }

  deleteItem() {
    this._repository.Delete(this._selectedKagalog.id).subscribe();

    let i = this._katalogs?.findIndex((d) => d.id === this._selectedKagalog.id);
    if (i) this._katalogs?.splice(i, 1);
    this.cancel();
  }

  saveItem() {
    if (this._selectedKagalog.id == -1) {
      this._selectedKagalog.id = 0;
      this._repository
        .Create(this._selectedKagalog)
        .subscribe((data: Katalog) => this._katalogs?.push(data));
    } else {
      // let itemKatalog:Katalog=new Katalog(-1,"test");

      // при загрузке компонента мы подписались на GetKatalogs
      //this.loadKatalogs() Katalog[]
      // получаем ссылку на item в []Katalog _selectKatalog
      // нужно изменить данные только на сервере на клиенте именяются в результате привязки к _selectItem
      //и ссылки на item в  массиве
      //

      this._repository.Update(this._selectedKagalog).subscribe();

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
    this._flagDisplayAddButton = true;
  }
}
