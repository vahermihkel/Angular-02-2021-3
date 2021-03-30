import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/cart/cart.service';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() item!: Item;
  @Input() i!: number;

  constructor(private cartService: CartService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
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
    this.cookieService.set("Ostukorv", JSON.stringify(this.cartService.itemsInCart))
  }

}
