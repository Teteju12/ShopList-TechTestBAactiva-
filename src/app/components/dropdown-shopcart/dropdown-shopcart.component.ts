import { Component, OnInit } from '@angular/core';
import { JsonDBService } from 'src/app/services/json-db.service';
import { ShopCartService } from 'src/app/services/shop-cart.service';

@Component({
  selector: 'app-dropdown-shopcart',
  templateUrl: './dropdown-shopcart.component.html',
  styleUrls: ['./dropdown-shopcart.component.css']
})
export class DropdownShopcartComponent implements OnInit {

  quantityProducts: any[] = [];
  totalWithOffers: number;
  length: number;

  constructor(private jsonDB: JsonDBService, private shopcart: ShopCartService) {
    this.totalWithOffers = 0;
    this.length = 0;

  }


  ngOnInit(): void {
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
    this.totalWithOffers = this.shopcart.getTotalPriceWithOffers();
    this.length = this.shopcart.getShopcartLength();
  }

}
