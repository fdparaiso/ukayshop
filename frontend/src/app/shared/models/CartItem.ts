import { Clothes } from "./Clothes";

export class CartItem{

    constructor(public clothes:Clothes){}

        quantity: number= 1;
        price: number = this.clothes.price;
    }

