import {UI} from 'src/app/ui/shared/_interfaces/ui.mondel'

export interface Brand extends UI{
  id: number;
  name: string;
  hidden:boolean;
  postavchikId:number;
}
