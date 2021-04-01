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

  constructor(private route: ActivatedRoute,
    private itemService: ItemService,
    private cartService: CartService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get("itemId"));
    console.log(this.route.snapshot.paramMap);
    console.log(id);
    this.item = this.itemService.items[id];
    console.log(this.item); 

  }

  onRemoveFromCart() {
    let index = this.cartService.itemsInCart.findIndex(itemInCart => 
      this.item.title == itemInCart.item.title
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
      this.item.title == itemInCart.item.title
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