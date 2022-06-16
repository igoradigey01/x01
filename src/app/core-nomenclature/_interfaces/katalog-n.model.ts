import {UI} from 'src/app/ui/shared/_interfaces/ui.mondel'

export interface KatalogN extends UI{
  id: number;
  categoriaId:number; // CategoriaN ID
  categoriaName:string;
  name: string;
  hidden:boolean;
  decriptSEO: string;
  postavchikId:number;
}
