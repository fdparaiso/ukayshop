import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Clothes } from '../shared/models/Clothes';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubjext:BehaviorSubject<Cart>
   = new BehaviorSubject(this.cart);

  constructor() { }

  addToCart(clothes: Clothes):void{
    let cartItem = this.cart.items.find(item=>
       item.clothes.id ===clothes.id);

       if (cartItem)
       return;

       this.cart.items.push(new CartItem(clothes));
       this.setCartToLocalStorage();

  }

  removeFromCart(clothesId:number):void{
    this.cart.items =
    this.cart.items.filter(item => item.clothes.id !=clothesId);
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubjext.asObservable();
  }

  getCart():Cart{
    return this.cartSubjext.value;
  }

  private setCartToLocalStorage():void{
    this.cart.totalPrice = this.cart.items
    .reduce((prevSum, currentItem)=> prevSum + currentItem.price, 0);


    const cartJson= JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubjext.next(this.cart);
  }

  private getCartFromLocalStorage():Cart{
    const cartJson= localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson): new Cart();
  }


}
