import {ImageDetile} from  './image-detile.model';
import { Product } from "./product.model";
import {Nomenclature} from './nomenclature.model'

export interface ProductDetile {
  product:Product;
  image?:ImageDetile[];
  nomenclature?:Nomenclature[];
}
