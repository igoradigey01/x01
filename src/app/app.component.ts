import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 // title = 'X-01';
  year:number=new Date().getFullYear();
  name:string="Ханская Мебель";
}
