export class Fruit {
    name: String;
    weight: Number;
    unit: String;
    price: Number;
    currency: String;
    img: String;

    constructor(name, weight, unit, price, currency, img){
        this.name = name;
        this.weight = weight;
        this.unit = unit;
        this.price = price;
        this.currency = currency;
        this.img = img;
    }

    getName(){
        return this.name;
    }

    getWeight(){
        return this.weight;
    }

    getUnit(){
        return this.unit;
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
}
