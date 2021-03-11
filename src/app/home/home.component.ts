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
  itemsShown: Item[] = [];
  itemsOriginal: Item[] = [];
  sortPriceNumber = 0;
  sortTitleNumber = 0;

  constructor(
    private cartService: CartService,
    private itemService: ItemService) { }

  ngOnInit(): void {
    // this.items = this.itemService.items;
    // this.itemService.saveItemsToDatabase();
    this.itemService.getItemsFromDatabase().subscribe(itemsFromDatabase => {
      this.itemsOriginal = [];
      for (const key in itemsFromDatabase) {
        const element = itemsFromDatabase[key];
        this.itemsOriginal.push(element);
        this.itemService.items.push(element);
      }
      this.itemsShown = this.itemsOriginal.slice();
    })
  }

  // splice() - kustutab massiivist
  // slice() - teeb massiivist koopia - ei anna mäluaadressi
  // split() - teeb stringist massiivi "tere".split() -- ["t","e","r","e"]

  onSortTitle() {
      if (this.sortTitleNumber == 0) {
        this.itemsShown.sort((a, b) => a.title.localeCompare(b.title));
        this.sortTitleNumber = 1;
      } else if (this.sortTitleNumber == 1) {
        this.itemsShown.sort((a, b) => b.title.localeCompare(a.title));
        this.sortTitleNumber = 2;
      } else {
        this.itemsShown = this.itemsOriginal.slice();
        this.sortTitleNumber = 0;
      }
  }

  onSortPrice() {
    if (this.sortPriceNumber == 0) {
      this.itemsShown.sort((a, b) => a.price - b.price);
      this.sortPriceNumber = 1;
    } else if (this.sortPriceNumber == 1) {
      this.itemsShown.sort((a, b) => b.price - a.price);
      this.sortPriceNumber = 2;
    } else {
      this.itemsShown = this.itemsOriginal.slice();
      this.sortPriceNumber = 0;
    }
  }

  onAddToCart(item: Item) {
    this.cartService.itemsInCart.push(item);
    this.cartService.cartChanged.next(this.cartService.itemsInCart);
  }

}
