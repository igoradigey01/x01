// конечное представление  продукта Камод-лдсп-венги Камод-мдф-венги Кровать-2000*1400-дубСанома
export interface Product {
  id: number;
  name: string;
  katalogId: number;
  katalogName?:string;
  materialId: number;
  materialName?:string;
  categoriaId:number;
  categoriaName?:string;
  price?: number;
  markup?: number; //Торговая наценка
  description?: string;
  guid: string; // name -- img getServer(wwwroot/image)
  wwwroot?:string; //url for  server-folder wwwroot/
  imageWebp?: Blob; // именованая ссылка на Blob  window.URL.createObjectURL(d)
  wwwrootOK?:boolean; // change  img on server (wwwroot/image)
  imageBase64?: string;
}







