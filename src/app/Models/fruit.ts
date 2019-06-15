export class Fruit {
    name: String;
    weight: String;
    price: Number;
    currency: String;
    img: String;
    left: Number;

    constructor(name, weight, price, currency, img, left){
        this.name = name;
        this.weight = weight;
        this.price = price;
        this.currency = currency;
        this.img = img;
        this.left = left;
    }

    getName(){
        return this.name;
    }

    getWeight(){
        return this.weight;
    }

    getPrice(){
        return this.price;
    }

    getCurr(){
        return this.currency;
    }

    getImg(){
        return this.img;
    }

    getLeft(){
        return this.left;
    }
}
