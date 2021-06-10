import { Component, OnInit } from '@angular/core';
import { JsonDBService } from 'src/app/service/json-db.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  productList: any[];
  quantityProducts: any[] = [];

  constructor(private jsonDB: JsonDBService) {
  }

  async ngOnInit(){
    this.productList = this.jsonDB.getProductList();

    this.productList.forEach(
      product => this.quantityProducts.push({"id": product.id, "quantity": 0})
    );

  }

  math(_id:string, signType: string){
    let product = this.quantityProducts.find(p_index => p_index.id == _id);

    if(signType === '-'){
      product.quantity--;
      if(product.quantity < 0) product.quantity = 0;
    }else if(signType === '+'){
      product.quantity++;
    }

    let htmlSpanElement = document.getElementById(product.id + "_quantity");
    htmlSpanElement.innerHTML = product.quantity;
  }
}
