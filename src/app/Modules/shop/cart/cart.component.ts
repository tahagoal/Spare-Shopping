import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  shoppingcart: any;

  constructor() { }

  ngOnInit() {
    this.getShoppingCart();
  }

  getShoppingCart() {
    this.shoppingcart = localStorage.getItem('shoppingcart');
    this.shoppingcart = JSON.parse(this.shoppingcart);    
  }

  addfruit(fruittype){
    let fruit_selected:any;
    for(var i=0; i< this.shoppingcart.fruits.length; i ++){
      if(this.shoppingcart.fruits[i].type.name == fruittype.name){
        this.shoppingcart.fruits[i].number ++;
        fruit_selected = this.shoppingcart.fruits[i].type;
      }
    }
    this.shoppingcart.price += parseInt(fruit_selected.price);
  }

  minusfruit(fruittype){
    let fruit_selected:any;
    for(var i=0; i< this.shoppingcart.fruits.length; i ++){
      if(this.shoppingcart.fruits[i].number == 0)
        return;

      if(this.shoppingcart.fruits[i].type.name == fruittype.name){
        this.shoppingcart.fruits[i].number --;
        fruit_selected = this.shoppingcart.fruits[i].type;
      }
    }
    this.shoppingcart.price -= parseInt(fruit_selected.price);
  }

  deleteall(){
    this.shoppingcart={price:0,fruits:[]};
  }

}
