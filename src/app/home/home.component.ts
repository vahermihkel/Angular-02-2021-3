import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';
import { ShowActiveItemsPipe } from './show-active-items.pipe';

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
  isLoggedIn = false;

  constructor(private authService: AuthService,
    private itemService: ItemService,
    private showActiveItems: ShowActiveItemsPipe) { }

  ngOnInit(): void {
    this.authService.loggedInChanged.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn; 
    })
    this.isLoggedIn = localStorage.getItem("userData") ? true : false;
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
    if (category == 'all') {
      this.itemsShown = this.itemsOriginal;
      this.categoryShown = 'all';
    } else {
      this.categoryShown = category;
      this.itemsShown = this.itemsOriginal.filter((item)=>item.category==category)
    }
  }

  // splice() - kustutab massiivist
  // slice() - teeb massiivist koopia - ei anna mäluaadressi
  // split() - teeb stringist massiivi "tere".split() -- ["t","e","r","e"]

  onSortTitle() {
    this.itemsShown = this.itemsOriginal.slice();
      if (this.sortTitleNumber == 0) {
        this.itemsShown.sort((a, b) => a.title.localeCompare(b.title));
        this.sortTitleNumber = 1;
      } else if (this.sortTitleNumber == 1) {
        this.itemsShown.sort((a, b) => b.title.localeCompare(a.title));
        this.sortTitleNumber = 2;
      } else {
        this.categoryShown = this.categoryShown == "" ? 'all' : this.categoryShown;
        this.onCategorySelect(this.categoryShown);
        this.sortTitleNumber = 0;
      }
      this.itemsShown = this.showActiveItems.transform(this.itemsShown, this.isLoggedIn);
  }

  onSortPrice() {
    // muteerumise vältimiseks, teeme koopia
    this.itemsShown = this.itemsOriginal.slice();
    if (this.sortPriceNumber == 0) {
      // 12,13,414,1231,12312,1,213,1
      this.itemsShown.sort((a, b) => a.price - b.price);
      this.sortPriceNumber = 1;
    } else if (this.sortPriceNumber == 1) {
      this.itemsShown.sort((a, b) => b.price - a.price);
      this.sortPriceNumber = 2;
    } else {
      this.categoryShown = this.categoryShown == "" ? 'all' : this.categoryShown;
      this.onCategorySelect(this.categoryShown);
      this.sortPriceNumber = 0;
    }
    this.itemsShown = this.showActiveItems.transform(this.itemsShown, this.isLoggedIn);
  }

  itemActiveChanged(item: Item) {
    let i = this.itemsOriginal.findIndex(itemOriginal => item.barcode == itemOriginal.barcode )
    this.itemsOriginal[i] = item;
    this.itemService.items[i] = item;
    this.itemService.saveItemsToDatabase().subscribe();
  }

}
