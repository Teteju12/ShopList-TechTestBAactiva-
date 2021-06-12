import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { JsonDBService } from 'src/app/services/json-db.service';

@Component({
  selector: 'app-shopcart',
  templateUrl: './shopcart.component.html',
  styleUrls: ['./shopcart.component.css']
})
export class ShopcartComponent implements OnInit {

  quantityProducts: any[] = [];
  total: number;
  productList: any[] = [];
  offerList: any[] = [];

  constructor(private dataTransfer: DataTransferService, private jsonDB: JsonDBService) {
    this.productList = this.jsonDB.getProductList();
    this.offerList = this.jsonDB.getOffersList();

    console.log(this.offerList);
  }


  ngOnInit(): void {
    this.dataTransfer.getObservableData("quantityProducts").subscribe(
      val => {
        this.quantityProducts = val;
        this.updatePrizes();
      }
    );
  }

  updatePrizes(){
    this.total = 0;

    this.quantityProducts.forEach((quantityProd) => {

      //we make relationships between the tables, like in SQL
      let selectedProduct = this.productList.find(product => product.id == quantityProd.id);
      let selectedOffer = this.offerList.find( offer => {
          if(offer.products == selectedProduct.id && offer.products == quantityProd.id)
            return offer;
        });

      switch(selectedOffer.offerType){
        case 'fixed': //the price will drop to a specific prize if they surpass the specific related level
          if(quantityProd.quantity >= selectedOffer.numProductsToStartOffer){
            this.total += (quantityProd.quantity*selectedOffer.Ammount);

          }else{
            this.total += (quantityProd.quantity*selectedProduct.price);
            console
          }
          break;
        case 'free': //the price wont be counted when the products reach a certain number
          let generalcounter = 0;
          let offercounter = 1;

          while(generalcounter < quantityProd){
            if(offercounter < selectedOffer.numProductsToStartOffer){
              offercounter++;
              this.total += selectedProduct.price;
            }else{
              offercounter = 1;
            }
            generalcounter++;
          }
          break;
        case 'discount': // the price will be discounted when the qwuantity of products surpass a certain number
          let firstPrice = (quantityProd.quantity*selectedProduct.price);
          this.total += firstPrice;
          if(quantityProd.quantity >= selectedOffer.numProductsToStartOffer){
            this.total -= firstPrice*(1-selectedOffer.Ammount);
          }
          break;
        default:
          this.total += (quantityProd.quantity*selectedProduct.price);
          break;
      }
      console.log(this.total);

    });
  }

}
