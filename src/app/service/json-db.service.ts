import { Injectable } from '@angular/core';
import products from '../../assets/JSON/products.json';

@Injectable({
  providedIn: 'root'
})
export class JsonDBService {

  productList: any[]
  constructor() {
    this.productList = products;
  }

  getProductList(){
    return this.productList;
  }
}
