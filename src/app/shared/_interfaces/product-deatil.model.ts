import {ImageDelatil} from  './image-delatil.model';
import { Product } from "./product.model";
import {Nomenclature} from './nomenclature.model'

export interface ProductDetail {
  product:Product;
  image?:ImageDelatil[];
  nomenclature?:Nomenclature[];
}
