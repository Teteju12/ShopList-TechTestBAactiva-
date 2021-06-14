import { Component, OnInit } from '@angular/core';
import { JsonDBService } from 'src/app/services/json-db.service';
import { ShopCartService } from 'src/app/services/shop-cart.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  productList: any[];
  quantityProducts: any[] = [];

  constructor(private jsonDB: JsonDBService, private shopcart: ShopCartService) {

  }

  async ngOnInit(){
    this.productList = this.jsonDB.getProductList();

    this.productList.forEach(
      product => this.quantityProducts.push({"id": product.id, "quantity": 0})
    );

  }

  math(_id:string, signType: string){
    let product = this.shopcart.addOrSubstractToCart(_id, signType);
    let htmlSpanElement = document.getElementById(product.id + "_quantity");
    htmlSpanElement.innerHTML = product.quantity;
    this.shopcart.updatePrizes();
  }
}
