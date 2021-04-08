import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/cart/cart.service';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() item!: Item; // võtab parent componendilt - parentis [item]="VÄÄRTUS"
  @Input() i!: number;   // parentis:  [i]="VÄÄRTUS"
  isLoggedIn = false;
  @Output() itemActiveChange:EventEmitter<Item> = new EventEmitter(); // saadab parent componenti

  constructor(private cartService: CartService,
    private cookieService: CookieService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loggedInChanged.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn; 
    })
    this.isLoggedIn = localStorage.getItem("userData") ? true : false;
  }

  onItemActive() {
    this.item.isActive = !this.item.isActive;
    this.itemActiveChange.emit(this.item);
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
      this.cartService.cartChanged.next(this.cartService.itemsInCart);
      this.cookieService.set("Ostukorv", JSON.stringify(this.cartService.itemsInCart));
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
    this.cartService.cartChanged.next(this.cartService.itemsInCart);
    this.cookieService.set("Ostukorv", JSON.stringify(this.cartService.itemsInCart));
  }

}
