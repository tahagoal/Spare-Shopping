import { Component, OnInit } from '@angular/core';
import { Fruit } from 'src/app/Models/fruit';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  fruitlist: Fruit[];
  shoppingcart = {
    price: 0,
    fruits: []
  }

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.fruitlist = this.route.snapshot.data.fruits;
  }

  addfruit(fruit) {
    this.shoppingcart.price += parseInt(fruit.getPrice());
    this.shoppingcart.fruits.push(fruit);
    localStorage.setItem('shoppingcart', JSON.stringify(this.shoppingcart));
  }

  minusfruit(fruit) {
    for (var i = 0; i < this.shoppingcart.fruits.length; i++) {
      if (this.shoppingcart.fruits[i] == fruit){
        this.shoppingcart.price -= parseInt(fruit.getPrice());
        this.shoppingcart.fruits.splice(i, 1);
      }
    }
    localStorage.setItem('shoppingcart', JSON.stringify(this.shoppingcart));
  }

  getfruitNumber(fruit) {
    let number = 0;
    for (var i = 0; i < this.shoppingcart.fruits.length; i++) {
      if (this.shoppingcart.fruits[i] == fruit)
        number++;
    }
    return number;
  }

}
