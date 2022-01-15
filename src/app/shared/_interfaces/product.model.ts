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
  image?: string; // name -- img getServer(wwwroot/image)
  rootSrc?:string;
  photo?: any; // именованая ссылка на Blob  window.URL.createObjectURL(d)
  imageBase64?: any;
}







