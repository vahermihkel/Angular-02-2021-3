import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
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
  categoryShown = "";
  itemsOriginal: Item[] = [];
  sortPriceNumber = 0;
  sortTitleNumber = 0;
  // date = new Date();

  constructor(
    private itemService: ItemService) { }

  ngOnInit(): void {
    // this.date = new Date();
    // this.items = this.itemService.items;
    // this.itemService.saveItemsToDatabase();
    this.itemService.getItemsFromDatabase().subscribe(itemsFromDatabase => {
      this.itemsOriginal = [];
      this.itemService.items = [];
      for (const key in itemsFromDatabase) {
        const element = itemsFromDatabase[key];
        this.itemsOriginal.push(element);
        this.itemService.items.push(element);
      }
      this.itemsShown = this.itemsOriginal.slice();
    })
  }

  onCategorySelect(category: string) {
    this.categoryShown = category;
    this.itemsShown = this.itemsOriginal.filter((item)=>item.category==category)
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
      // 12,13,414,1231,12312,1,213,1
      this.itemsShown.sort((a, b) => a.price - b.price);
      this.sortPriceNumber = 1;
    } else if (this.sortPriceNumber == 1) {
      this.itemsShown.sort((a, b) => b.price - a.price);
      this.sortPriceNumber = 2;
    } else {
      // muteerumise vältimiseks, teeme koopia
      this.itemsShown = this.itemsOriginal.slice();
      this.sortPriceNumber = 0;
    }
  }

}
