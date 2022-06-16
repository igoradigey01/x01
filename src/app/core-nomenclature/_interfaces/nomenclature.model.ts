import {UI} from 'src/app/ui/shared/_interfaces/ui.mondel'
export interface Nomenclature extends UI {
  id: number;
  name: string;
  description:string;
  price:number;
  markup:number;
  guid:string;   // name -- img getServer(wwwroot/image)
  position:number;// for by Sort in list render
  hidden:boolean;
  inStock:boolean; //есть  на складе ?
  sale:boolean; // распродажа ?
 // rootStrImg:string; // src for img on server wwwroot/image
  katalogId:number;
  katalogName?:string;
  colorId:number;
  colorName?:string;
  brandId:number;
  brandName?:string;
  articleId:number;
  articleName?:string;
  postavchikId:number
  wwwroot?:string; //url for  server-folder wwwroot/
  imageWebp?: Blob; // именованая ссылка на Blob  window.URL.createObjectURL(d)
  wwwrootOK?:boolean;                    // onChangeWebp?:boolean; // change  img on server (wwwroot/image)
  imageBase64?: string;
}
