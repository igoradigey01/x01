import { Injectable } from '@angular/core';
import { ManagerServiceModule } from './maneger-service.module';
import { jsPDF } from "jspdf";
import { HttpClient } from '@angular/common/http';
declare var font:any;


@Injectable({
  providedIn: ManagerServiceModule
})
export class JsPDFService {

  private _urlFonts:string='/assets/fonts/RobotoRegularNormal.txt';
  private _loadFont: string|null=null;               //Roboto-Regular-normal.js'
  private var_font:string='jspdfFont';

  constructor(
    private _http: HttpClient
  ) {
       // if(!this.Exists){
          this._http.get(this._urlFonts, {
            responseType: "text"
          }).subscribe(
            d=>{
            this._loadFont=d
             localStorage.setItem(this.var_font,this._loadFont)
            }
          )

        // }
        // else{
        //   this._loadFont=localStorage.getItem(this.var_font);
        // }

   }

  public get DocPDF():jsPDF{
  // debugger
    let doc = new jsPDF();
    if(this._loadFont){
      let str=this._loadFont as string;

      doc.addFileToVFS('Roboto-Regular-normal.ttf', str)
      doc.addFont('Roboto-Regular-normal.ttf', 'Roboto', 'normal');
        // new jsPDF();                         //this._repository.DocPDF
       console.log(doc.getFontList())

       doc.setFont('Roboto');


    }


    return doc;

  }

  private get Exists(): boolean {
    let font = localStorage.getItem(this.var_font);
  // debugger
    if (font) {
      return true;
    }
    return false;
  }
}
