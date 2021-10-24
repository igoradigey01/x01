import {Image} from  './image.model';
import { Product } from "./product.model";
import {Material} from './material.model'

export interface ItemProduct {
  product:Product;
  image?:Image[];
  nomenclature?:Material[];
}
