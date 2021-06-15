import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { JsonDBService } from './json-db.service';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {

  productList: any[] = [];
  offerList: any[] = [];

  fullproductList: any [] = [];
  finalShopCartArray: any[] = [];
  shopcartObserver: any;
  total: number;
  totalWithOffers: number;
  totalObservable: Observable<number>;

  constructor(private db: JsonDBService) {
    this.productList = db.getProductList();
    this.offerList = db.getOffersList();
    this.initShopCart();
    this.shopcartObserver = of(this.finalShopCartArray);
    this.total = 0;
    this.totalWithOffers = 0;
    this.totalObservable = of(this.totalWithOffers);

  }

  private initShopCart(){
    this.fullproductList.push({ //the template of the product
        "offers": {
          "hasOffer": false,
          "offerType": undefined,
          "Ammount": 0,
          "numProductsToStartOffer": 0
        },
        "id": "0",
        "name": undefined,
        "price": 0,
        "quantity": 0
    })
  }

  addProductToShopCart(_product){
    let offer = this.offerList.find(p_index => p_index.products == _product.id);
    if(offer){
      this.finalShopCartArray.push({
        "offers": {
            "hasOffer": true,
            "offerType": offer.offerType,
            "Ammount": offer.Ammount,
            "numProductsToStartOffer": offer.numProductsToStartOffer
          },
        "id": _product.id,
        "name": _product.name,
        "price": _product.price,
        "quantity": 0

      })
    }else{
      this.finalShopCartArray.push({
        "offers": {
            "hasOffer": false,
            "offerType": undefined,
            "Ammount": 0,
            "numProductsToStartOffer": 0
          },
        "id": _product.id,
        "name": _product.name,
        "price": _product.price,
        "quantity": 0
      })
    }

  }

  public getShopCart(){
    return this.finalShopCartArray;
  }

  public addOrSubstractToCart(_id: string, signType: string ){
    let product = this.finalShopCartArray.find(p_index => p_index.id == _id);
    if(!product){
      product = this.productList.find(p_index => p_index.id == _id);
      this.addProductToShopCart(product);
      product = this.finalShopCartArray.find(p_index => p_index.id == _id);
    }

    if(signType === '-'){
      product.quantity--;
      if(product.quantity < 0) product.quantity = 0;
    }else if(signType === '+'){
      product.quantity++;
    }

    return product;
  }

  getObservableShopcart(){
    return this.shopcartObserver;
  }

  updatePrizes(){
    this.total = 0;
    this.totalWithOffers = 0;

    this.finalShopCartArray.forEach((quantityProd) => {
      this.total += quantityProd.price*quantityProd.quantity;

      //we make relationships between the tables, like in SQL
      let selectedOffer = quantityProd.offers;

      if(selectedOffer.hasOffer){
        switch(selectedOffer.offerType){
          case "fixed": //the price will drop to a specific prize if they surpass the specific related level
            if(quantityProd.quantity >= selectedOffer.numProductsToStartOffer){
              this.totalWithOffers += (quantityProd.quantity*selectedOffer.Ammount);

            }else{
              this.totalWithOffers += (quantityProd.quantity*quantityProd.price);
              console
            }
            break;
          case "free": //the price wont be counted when the products reach a certain number
            let generalcounter = 0;
            let offercounter = 1;
            while(generalcounter < quantityProd.quantity){
              if(offercounter < selectedOffer.numProductsToStartOffer){
                offercounter++;
                this.totalWithOffers += quantityProd.price;
              }else{
                offercounter = 1;
              }
              generalcounter++;
            }
            break;
          case "discount": // the price will be discounted when the qwuantity of products surpass a certain number
            let firstPrice = (quantityProd.quantity*quantityProd.price);
            this.totalWithOffers += firstPrice;
            if(quantityProd.quantity >= selectedOffer.numProductsToStartOffer){
              this.totalWithOffers -= firstPrice*(1-selectedOffer.Ammount);
            }
            break;
          default:
            this.totalWithOffers += (quantityProd.quantity*quantityProd.price);
            break;
        }
      }

    });

    this.total = parseFloat(this.total.toFixed(2));
    this.totalWithOffers = parseFloat(this.totalWithOffers.toFixed(2));
    console.log(this.total + " - " + this.getTotalDiscount() + " = " + this.getTotalPriceWithOffers());
  }

  getTotalPrice(){
    return this.total;
  }

  getTotalPriceWithOffers(){
    return this.totalWithOffers;
  }

  getTotalDiscount(){
    return parseFloat((this.total - this.totalWithOffers).toFixed(2));
  }

  getObservableTotal(){
    return this.totalObservable;
  }

  getShopcartLength(){
    return this.finalShopCartArray.length;
  }
}
