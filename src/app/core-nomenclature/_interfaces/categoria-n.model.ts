import {UI} from 'src/app/ui/shared/_interfaces/ui.mondel'

export interface CategoriaN extends UI {
  id: number;
  name: string;
  flag_link:boolean;
  flag_href:boolean;
  link:string|undefined;
  hidden:boolean;
  decriptSEO: string;
  postavchikId:number
}
