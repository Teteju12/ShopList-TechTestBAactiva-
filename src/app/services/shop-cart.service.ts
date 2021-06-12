import { Injectable } from '@angular/core';
import { JsonDBService } from './json-db.service';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {

  productList: any[] = [];
  offerList: any[] = [];

  finalShopCartArray: any[] = []
  total: number;

  constructor(private db: JsonDBService) {
    this.productList = db.getProductList();
    this.offerList = db.getOffersList();
  }

  setShopCart(quantityListProducts){
    this.quantityProducts
  }

  getShopCart(){
    return this.finalShopCartArray;
  }


}
