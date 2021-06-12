import { Injectable } from '@angular/core';
import products from '../../assets/JSON/products.json';
import offers from '../..//assets/JSON/offers.json';

@Injectable({
  providedIn: 'root'
})
export class JsonDBService {

  productList: any[]
  offerList: any[];

  constructor() {
    this.productList = products;
    this.offerList = offers;
  }

  getProductList(){
    return this.productList;
  }

  getOffersList(){
    return this.offerList;
  }
}
