import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-bg-carousel',
  templateUrl: './bg-content.component.html',
  styleUrls: ['./bg-content.component.scss'],
})
export class BgContentComponent implements OnInit {
 private pathRoot: string = '../../assets/bg_img/'; //path к папки background-image:url

 private imgs: string[] = ['img_1.webp', 'img_2.webp', 'img_3.webp']; //.jpg

 public i: number = 0;
  counter: number = 0;
  imgBgPath: string = this.pathRoot + this.imgs[this.i];
  imgBgLoad: string = this.imgBgPath;
  flag_bg: boolean = false; // background-image:url or background-color
  loading_img: boolean = false;

  subscription_timer: Subscription | null = null;
  // img:ImageBitmap

  public get  getUrl(){
    return "background-image: url("+this.imgBgPath +");"

  }

  constructor() {}

  ngOnInit(): void {
    this.i = 0;

    const timer = new Observable((observer) => {
      const intervalId = setInterval(() => {
        this.loading_img = false;

        observer.next(this.bgImagePath());
      }, 40000);
      return () => {
        clearInterval(intervalId);
      };
    });
    this.subscription_timer = timer.subscribe();
  }

  /*--x_01 карусель  background-image:url   из _listImg --*/

  bgImagePath(): string {
    //  console.log("Test bgImgePath()")
    //let j:number=0;j<this._list.length;j++
    this.i++;
    if (this.i < this.imgs.length) {
      this.imgBgPath = this.pathRoot + this.imgs[this.i];
    } else {
      this.i = 0;
      this.imgBgPath = this.pathRoot + this.imgs[this.i];
    }

    //console.log(this._imgScr);
    return this.imgBgPath;
  }

  changeBackground() {
    this.loading_img = true;
    ++this.counter;
    if (this.counter < 3) {
      this.imgBgLoad = this.pathRoot + this.imgs[this.counter];

      // console.log("counet---"+this.counter);
    }
    // throw new Error("not impliment exeption");
  }

  changedTheme(): void {
    if (this.flag_bg == false) {
      this.flag_bg = true;

      this.subscription_timer?.unsubscribe();
      this.imgBgPath = '';
      return;
    }
    this.flag_bg = false;
    this.bgImagePath();

    //  throw new Error("---Metod не задан --onchengFlag()--body-shop.component.ts");
  }
  changedPozition(i: number) {
    this.flag_bg = false;
    this.i = i;
    this.imgBgPath = this.pathRoot + this.imgs[this.i];
  }

  next(): void {
    //throw new Error("---Metod не задан--body-shop.component.ts");
    this.flag_bg = false;
    this.bgImagePath();
  }
  /*metod вызова коментарий тест*/
  public back() {
    this.flag_bg = false;
    if (this.i == 0) {
      this.i = 5;
    }
    this.i--;
    this.i--;
    this.bgImagePath();
  }
  //сборщик мусора
  ngOnDestroy() {
    this.subscription_timer?.unsubscribe();
  }


}
