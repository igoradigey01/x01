import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {InfoService} from './../shared/sevices/info.service';
//import {VertionInfo} from '../../data-model/class-data.model';




@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

export class InfoComponent implements OnInit {

  vertionServer:string='';
  vertionClint:string='1.00.6--27.10.21';

  constructor(
    private _repository:InfoService
  ) { }

  ngOnInit(): void {
    this._repository.Vertion.subscribe((d)=>{this.vertionServer=d.verion;

    });
  }

}
