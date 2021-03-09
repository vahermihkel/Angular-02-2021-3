import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Item[] = [];

  constructor(
    private cartService: CartService,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.items = this.itemService.items;
    // this.itemService.saveItemsToDatabase();
    this.itemService.getItemsFromDatabase().subscribe(itemsFromDatabase => {
      for (const key in itemsFromDatabase) {
        const element = itemsFromDatabase[key];
        this.items.push(element);
      }
    })
  }

  onAddToCart(item: Item) {
    this.cartService.itemsInCart.push(item);
    this.cartService.cartChanged.next(this.cartService.itemsInCart);
  }

}
