import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-bg-carousel',
  templateUrl: './bg-content.component.html',
  styleUrls: ['./bg-content.component.scss'],
})
export class BgContentComponent implements OnInit {
  _bgImagePath: string = '../../assets/bg_img/'; //path к папки background-image:url

  _listImg: string[] = [
    'bg-1.jpg',
    'bg-2.jpg',
    'bg-3.jpg',
    'bg-4.jpg',
    'bg-5.jpg',
  ];
  _i: number = 0;
  _imgScr: string = this._bgImagePath + this._listImg[0];

  _srcImg1: string | null = null;
  _srcImg2: string | null = null;
  _srcImg3: string | null = null;
  _srcImg4: string | null = null;
  _srcImg5: string | null = null;
  _flag_bgimg: boolean = false;

  _subscription_timer: Subscription | null = null;

  constructor() {
    // this.bgImagePath();
  }

  ngOnInit(): void {
    this._i = 0;

   // this.bgImagePath();


    //--------------------
    const timer = new Observable((observer) => {
      const intervalId = setInterval(() => {
        observer.next(this.bgImagePath());
      }, 30000);
      return () => {
        clearInterval(intervalId);
      };
    });
    this._subscription_timer = timer.subscribe();
  }

  /*--x_01 карусель  background-image:url   из _listImg --*/

  bgImagePath(): string {
    //  console.log("Test bgImgePath()")
    //let j:number=0;j<this._list.length;j++
    this._i++;
    if (this._i < this._listImg.length) {
      this._imgScr = this._bgImagePath + this._listImg[this._i];
    } else {
      this._i = 0;
      this._imgScr = this._bgImagePath + this._listImg[this._i];
    }


    //console.log(this._imgScr);
    return this._imgScr;
  }

  changedTheme(): void {
    if (this._flag_bgimg == false) {
      this._flag_bgimg = true;

      this._subscription_timer?.unsubscribe();
      this._imgScr = '';
      return;
    }
    this._flag_bgimg=false;
    this.bgImagePath();

    //  throw new Error("---Metod не задан --onchengFlag()--body-shop.component.ts");
  }
  changedPozition(i:number){
    this._flag_bgimg=false;
    this._i=i;
    this._imgScr = this._bgImagePath + this._listImg[this._i];
  }

  onnext(): void {
    //throw new Error("---Metod не задан--body-shop.component.ts");
    this._flag_bgimg=false;
    this.bgImagePath();
  }
  /*metod вызова коментарий тест*/
  public onback() {
    this._flag_bgimg=false;
    if (this._i == 0) {
      this._i = 5;
    }
    this._i--;
    this._i--;
    this.bgImagePath();
  }
  //сборщик мусора
  ngOnDestroy() {
    this._subscription_timer?.unsubscribe();
  }
}
