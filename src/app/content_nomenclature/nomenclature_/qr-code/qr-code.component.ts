import { Component, OnInit, SimpleChanges  } from '@angular/core';
import { Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { jsPDF } from "jspdf";
import {JsPDFService} from './../../shared/services/js-pdf.service'


//declare var test: any;
//declare var hello:any;



//Что такое QR-код--
// https://cryptos.tv/chto-takoe-qr-kod-quick-response-code-kak-sozdat-i-skanirovat-qr-kod-na-smartfone/
// lib
//https://www.npmjs.com/package/ng-qrcode
// sample
//https://mnahkies.github.io/ng-qrcode/
@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {



  @Input() public _nomenclatureURL: string | undefined;
  @Input()   public _katalogURL:string |undefined;
  @Input() public _flagShowQrKatlog:boolean=true;
  @Input() public _fullName:string=''
  @Input() public _katalog_name:string|undefined;
  public _error:string|undefined;
  public _clientHostURL:string;



   public get NomenclatureURL():string|undefined{
     if(this._nomenclatureURL)
      return `${this._clientHostURL}${this._nomenclatureURL}`
      else return undefined;
   }


   public get KatalogURL():string|undefined{
      if(this._katalogURL)
       return `${this._clientHostURL}${this._katalogURL}`
       else return undefined;
   }

  constructor(
    private _repository:JsPDFService
  ) {
    this._clientHostURL = environment.clientRoot;
  }

  ngOnInit(): void {


  }

  private extractData(res: Response) {

}

  ngOnChanges(changes: SimpleChanges) {

   this._error=undefined;

  }


   public printQrKtalog():void{
     this._error=undefined;
    const toPrint = document.getElementsByTagName('canvas')[0];
    if(toPrint){
    let imageData=this.getBase64Canvas(toPrint);
    //console.log(imageData);
    let doc = this._repository.DocPDF
   // console.log(doc.getFontList)
    doc.setProperties({
      title:   this._fullName

  });

    this.createDoc(doc,imageData);

    doc.autoPrint();
    doc.output("dataurlnewwindow");
   // doc.save('tatle');
    }
    else{
      this._error="QR code незадан!"

    }

   }

  public downloadQrKtalog() {
    this._error=undefined;
    const toPrint = document.getElementsByTagName('canvas')[0];
    if(toPrint){
    let imageData=this.getBase64Canvas(toPrint);
    //console.log(imageData);
    let doc = this._repository.DocPDF
   // console.log(doc.getFontList)
    doc.setProperties({
      title:   this._fullName

  });

    this.createDoc(doc,imageData);


    doc.save(this._fullName);
    }
    else{
      this._error="QR code незадан!"

    }
  }

  public printQrNomenclature():void{
    this._error=undefined;
   const toPrint = document.getElementsByTagName('canvas')[1];
   if(toPrint){
   let imageData=this.getBase64Canvas(toPrint);
   //console.log(imageData);
   let doc = this._repository.DocPDF
  // console.log(doc.getFontList)
   doc.setProperties({
     title:   this._fullName

 });

   this.createDoc(doc,imageData);

   doc.autoPrint();
   doc.output("dataurlnewwindow");
  // doc.save('tatle');
   }
   else{
     this._error="QR code незадан!"

   }

  }

 public downloadQrNomenclature() {
   this._error=undefined;
   const toPrint = document.getElementsByTagName('canvas')[1];
   if(toPrint){
   let imageData=this.getBase64Canvas(toPrint);
   //console.log(imageData);
   let doc = this._repository.DocPDF
  // console.log(doc.getFontList)
   doc.setProperties({
     title:   this._fullName

 });

   this.createDoc(doc,imageData);


   doc.save(this._fullName);
   }
   else{
     this._error="QR code незадан!"

   }
 }

  private createDoc(doc:jsPDF,base64:string){



   console.log(   doc.getFontList());

    doc.text(this._fullName,40,5);
    let y_img=10;
    let y=40;
    let x=40;

    doc.addImage(base64, 'JPEG', 0, y_img, x, y);
    doc.addImage(base64, 'JPEG', 40, y_img, x, y);
    doc.addImage(base64, 'JPEG', 80, y_img, x, y);
    doc.addImage(base64, 'JPEG', 120, y_img, x, y);
    doc.addImage(base64, 'JPEG', 160, y_img, x, y);
   // doc.addImage(base64, 'JPEG', 180, y_img, x, y);
    // doc.addImage(base64, 'JPEG', 120, y_img, 20, 20);
    // doc.addImage(base64, 'JPEG', 140, y_img, 20, 20);
    // doc.addImage(base64, 'JPEG', 160, y_img, 20, 20);
    // doc.addImage(base64, 'JPEG', 180, y_img, 20, 20);

  }

  private  getBase64Canvas(canvas:any):string{
    var dataURL =<string> canvas.toDataURL("image/png");
    return dataURL;

  }



}
