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
  };
  form = {
    name: '',
    price: 0,
    size: '',
    left: 0,
  }
  popupblind:boolean = true;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.fruitlist = this.route.snapshot.data.fruits;
  }

  addfruit(fruit) {
    let addflag = false;
    let counter = 0;
    for (var i = 0; i < this.shoppingcart.fruits.length; i++) {
      if(this.shoppingcart.fruits[i].type.getName() == fruit.getName()){
        addflag = true;
        counter = i;
      }
    }
    if (!addflag) {
      let fruitObj = new Fruit(fruit.name, fruit.weight, fruit.unit, fruit.price, fruit.currency, fruit.img);
      let fruitWithNumber = {type: fruitObj, number: 1};
      this.shoppingcart.fruits.push(fruitWithNumber);
    }
    else{
      this.shoppingcart.fruits[counter].number ++;
    }
    this.shoppingcart.price += parseInt(fruit.getPrice());
    localStorage.setItem('shoppingcart', JSON.stringify(this.shoppingcart));
  }

  minusfruit(fruit) {
    let minusflag = false;
    let counter = 0;

    for (var i = 0; i < this.shoppingcart.fruits.length; i++) {
      if(this.shoppingcart.fruits[i].type.getName() == fruit.getName()){
        minusflag = true;
        counter = i;
      }
    }

    if(minusflag && this.shoppingcart.fruits[counter].number == 1){
      this.shoppingcart.fruits.splice(counter, 1);     
      this.shoppingcart.price -= parseInt(fruit.getPrice());
    }
    else if(minusflag && this.shoppingcart.fruits[counter].number > 1){
      this.shoppingcart.fruits[counter].number --;
      this.shoppingcart.price -= parseInt(fruit.getPrice());
    }
    
    localStorage.setItem('shoppingcart', JSON.stringify(this.shoppingcart));
  }

  getfruitNumber(fruit) {
    for (var i = 0; i < this.shoppingcart.fruits.length; i++) {
      if (this.shoppingcart.fruits[i].type.getName() == fruit.getName())
        return this.shoppingcart.fruits[i].number;
    }
  }

  openpop() {
    this.popupblind = false;
  }

  closepop() {
    this.popupblind = true;
  }

  saveproduct(){
    console.log(this.form);
  }

}
