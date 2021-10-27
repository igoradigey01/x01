import { Component, OnInit } from '@angular/core';
import {ContentService} from './../shared/sevices/content.service';

@Component({
  selector: 'app-admin',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  _url_img=this.repository.RootSrcImg;

  constructor( private repository:ContentService) { }

  ngOnInit(): void {
  }

}
