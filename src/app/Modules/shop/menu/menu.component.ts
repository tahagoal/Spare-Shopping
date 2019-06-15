import { Component, OnInit } from '@angular/core';
import { Fruit } from 'src/app/Models/fruit';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  form;
  popupblind:boolean = true;
  loadingshow:boolean = false;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.fruitlist = this.route.snapshot.data.fruits;
    this.form = new FormGroup({
      name: new FormControl('', Validators.pattern('[a-zA-Z ]*')),
      price: new FormControl('', Validators.pattern('[0-9]*')),
      size: new FormControl('', Validators.pattern('[A-Za-z0-9 ]*')),
      left: new FormControl('', Validators.pattern('[0-9]*'))
    });
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
      fruit.left -- ;
      let fruitObj = new Fruit(fruit.name, fruit.weight, fruit.price, fruit.currency, fruit.img, fruit.left);
      let fruitWithNumber = {type: fruitObj, number: 1};
      this.shoppingcart.fruits.push(fruitWithNumber);
      this.shoppingcart.price += parseInt(fruit.getPrice());
    }
    else if(fruit.left>0){
      fruit.left -- ;
      this.shoppingcart.fruits[counter].number ++;
      this.shoppingcart.price += parseInt(fruit.getPrice());
    }
    else if(fruit.left == 0){
      alert("not enough of this item left");
    }
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
      fruit.left ++;
      this.shoppingcart.fruits.splice(counter, 1);     
      this.shoppingcart.price -= parseInt(fruit.getPrice());
    }
    else if(minusflag && this.shoppingcart.fruits[counter].number > 1){
      fruit.left ++;
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

  get f() { return this.form.controls; }

  saveproduct(){
    if (this.form.invalid) {
      console.log(this.form);
      
      alert("something wrong");
    }
    else{
      this.loadingshow = true;
      let newfruit = new Fruit(this.form.controls.name.value, this.form.controls.size.value, this.form.controls.price.value, 'EGP',
        '/fruit3', this.form.controls.left.value);
        this.fruitlist.push(newfruit);
        this.closepop();
        setTimeout(() => {
          this.loadingshow = false;
        }, 500);
    }
  }

}
