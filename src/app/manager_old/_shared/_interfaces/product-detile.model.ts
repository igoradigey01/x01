import {ImageDetile} from  '../../../shared/_interfaces/image-detile.model';
import { Product } from "../../../shared/_interfaces/product.model";
import {Nomenclature} from './nomenclature.model'

export interface ProductDetile {
  product:Product;
  image?:ImageDetile[];
  nomenclature?:Nomenclature[];
}
