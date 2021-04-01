import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Item } from '../models/item.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  itemsInCart: {item: Item, count: number}[] = []
  sumOfCart: number = 0;

  // Dependency injection
  constructor(private cartService: CartService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.itemsInCart = this.cartService.itemsInCart;
    this.calculateSumOfCart();
  }

  onDeleteFromCart(index: number) {
    this.cartService.itemsInCart.splice(index,1);
    this.calculateSumOfCart();
  }

  onEmptyCart() {
    this.cartService.itemsInCart.splice(0);
    this.calculateSumOfCart();
  }

  onRemoveFromCart(item: Item) {
    let index = this.cartService.itemsInCart.findIndex(itemInCart => 
      item.title == itemInCart.item.title
    )
    if (index != -1) {
      if (this.cartService.itemsInCart[index].count == 1) {
        this.cartService.itemsInCart.splice(index,1);
      } else {
        this.cartService.itemsInCart[index].count -= 1;
      }
      this.calculateSumOfCart();
    }
  }

  onAddToCart(item: Item) {
    let index = this.cartService.itemsInCart.findIndex(itemInCart => 
      item.title == itemInCart.item.title
    )
    if (index == -1) {
      this.cartService.itemsInCart.push({item: item, count: 1});
    } else {
      this.cartService.itemsInCart[index].count += 1;
    }
    this.calculateSumOfCart();
  }

  calculateSumOfCart() {
    this.sumOfCart = 0;
    this.itemsInCart.forEach(item => {
      // this.sumOfCart = this.sumOfCart + item.price;
      this.sumOfCart += item.item.price*item.count;
    });
    this.cartService.cartChanged.next(this.cartService.itemsInCart);
    this.cookieService.set("Ostukorv", JSON.stringify(this.cartService.itemsInCart));
  }
}
