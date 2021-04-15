import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/cart/cart.service';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  item!: Item;
  isLoading = false;

  constructor(private route: ActivatedRoute,
    private itemService: ItemService,
    private cartService: CartService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("itemId");

    this.isLoading = true;
    this.itemService.getItemsFromDatabase().subscribe(itemsFromDatabase => {
      this.itemService.items = [];
      for (const key in itemsFromDatabase) {
          const element = itemsFromDatabase[key];
          this.itemService.items.push(element);
      }
      let firebaseItem = this.itemService.items.find(item=>item.barcode==id);
      if (firebaseItem) {
        this.item = firebaseItem;
      }
      this.isLoading = false;
    })
  }

  onRemoveFromCart() {
    let index = this.cartService.itemsInCart.findIndex(itemInCart => 
      this.item.barcode == itemInCart.item.barcode
    )
    if (index != -1) {
      if (this.cartService.itemsInCart[index].count == 1) {
        this.cartService.itemsInCart.splice(index,1);
      } else {
        this.cartService.itemsInCart[index].count -= 1;
      }
      this.cartService.cartChanged.next(this.cartService.itemsInCart);
      this.cookieService.set("Ostukorv", JSON.stringify(this.cartService.itemsInCart));
    }
  }

  // [{item: {title:string,price:number...}, count: 7},{item: this.item, count: 1}]

  onAddToCart() {
    let index = this.cartService.itemsInCart.findIndex(itemInCart => 
      this.item.barcode == itemInCart.item.barcode
    )
    if (index == -1) {
      this.cartService.itemsInCart.push({item: this.item, count: 1});
    } else {
      this.cartService.itemsInCart[index].count += 1;
    }
    this.cartService.cartChanged.next(this.cartService.itemsInCart);
    this.cookieService.set("Ostukorv", JSON.stringify(this.cartService.itemsInCart));
  }
}



// Stringist number ("12" -- 12)    Number("12")
// Numbrist string  (12  -- "12")   "12".toString();