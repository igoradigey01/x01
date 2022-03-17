import { Component, OnInit } from '@angular/core';
import {VersionInfo} from 'src/app/shared/_interfaces/vertion-info.model'
import {VersionInfoService} from 'src/app/shared/services/version-info.service';

@Component({
  selector: 'app-version-info',
  templateUrl: './version-info.component.html',
  styleUrls: ['./version-info.component.scss']
})
export class VersionInfoComponent implements OnInit {

  _sversion:string='';
  _sdescription:string='';


  constructor(public _info:VersionInfoService) { }

  ngOnInit(): void {
   this._info.ServerVersion.subscribe(d=>{
     this._sversion=d.version;
     this._sdescription=d.description;
   })
  }

}
