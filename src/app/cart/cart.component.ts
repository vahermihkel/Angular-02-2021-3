import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  itemsInCart: Item[] = []
  sumOfCart: number = 0;

  // Dependency injection
  constructor(private cartService: CartService) { }

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

  calculateSumOfCart() {
    this.sumOfCart = 0;
    this.itemsInCart.forEach(item => {
      // this.sumOfCart = this.sumOfCart + item.price;
      this.sumOfCart += item.price;
    });
  }
}
