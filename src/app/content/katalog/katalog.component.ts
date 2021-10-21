import { Component, OnInit, Input } from '@angular/core';

import { Katalog } from '../../shared/_interfaces/katalog.model';
import { KatalogService } from './../shared/sevices/katalog.service';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.scss'],
})
export class KatalogComponent implements OnInit {
  @Input() flagStyle: boolean = false;

  katalogs: Katalog[] | null = null;

  //-------------------
  constructor(private repository: KatalogService) {}

  ngOnInit(): void {
    this.repository.Katalogs().subscribe(
      (data) => {
        this.katalogs = data;
        console.log(this.katalogs);
      },
      (err) => console.log('load katalog err: --' + err)
    );
  }
}
//------------------------------
