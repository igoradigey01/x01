// конечное представление  продукта Камод-лдсп-венги Камод-мдф-венги Кровать-2000*1400-дубСанома
export interface Product {
  id: number;
  name: string;
  katalogId: number;
  katalogName?:string;
  typeProductId: number;
  typeProductName?:string;
  price?: number;
  markup?: number; //Торговая наценка
  description?: string;
  imgName?: string; // name -- img getServer(wwwroot/image)
  rootImgSrc?:string; //url for  server-folder wwwroot/
  imageWebp?: Blob; // именованая ссылка на Blob  window.URL.createObjectURL(d)
  onChangeWebp?:boolean; // change  img on server (wwwroot/image)
  imageBase64?: string;
}







