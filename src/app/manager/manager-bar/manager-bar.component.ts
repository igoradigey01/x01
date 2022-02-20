import { Component, OnInit } from '@angular/core';
import {ContentService} from '../shared/sevices/content.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager-bar.component.html',
  styleUrls: ['./manager-bar.component.scss']
})
export class ManagerBarComponent implements OnInit {

  _url_img=this.repository.RootImg;

  constructor( private repository:ContentService) { }

  ngOnInit(): void {
  }

}
