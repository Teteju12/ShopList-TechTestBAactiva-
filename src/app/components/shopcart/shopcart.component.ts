import { Component, OnInit } from '@angular/core';
import { JsonDBService } from 'src/app/services/json-db.service';
import { ShopCartService } from 'src/app/services/shop-cart.service';

@Component({
  selector: 'app-shopcart',
  templateUrl: './shopcart.component.html',
  styleUrls: ['./shopcart.component.css']
})
export class ShopcartComponent implements OnInit {

  quantityProducts: any[] = [];
  total: number;
  totalWithOffers: number;
  totalDiscount: number;
  productList: any[] = [];
  offerList: any[] = [];

  constructor(private jsonDB: JsonDBService, private shopcart: ShopCartService) {
    this.productList = this.jsonDB.getProductList();
    this.offerList = this.jsonDB.getOffersList();
    this.total = 0;
    this.totalWithOffers = 0;
    this.totalDiscount = 0;


  }


  ngOnInit(): void {
    setInterval(() => {
      this.updatePrices();
    }, 100);
    this.shopcart.getObservableShopcart().subscribe(
      val => {
        this.quantityProducts = val;
        this.updatePrices();
      },
      err => {console.error("halp =>", err)},
      () => {}
    );
  }

  updatePrices(): void{
    this.total = this.shopcart.getTotalPrice();
    this.totalWithOffers = this.shopcart.getTotalPriceWithOffers();
    this.totalDiscount = this.shopcart.getTotalDiscount();
  }


}
