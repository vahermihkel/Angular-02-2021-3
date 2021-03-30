import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/cart/cart.service';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartSum = 0;
  isLoggedIn = false;

  constructor(private cartService: CartService,
    private translate: TranslateService,
    private authService: AuthService,
    private cookieService: CookieService ) { }

  ngOnInit(): void {
    this.cartService.itemsInCart = JSON.parse(this.cookieService.get("Ostukorv")) || [];

    this.authService.loggedInChanged.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    })
    this.isLoggedIn = localStorage.getItem("userData") ? true : false;

    // Ternary operator
    // if (localStorage.getItem("userData") != undefined) {
    //   this.isLoggedIn = true;
    // } else {
    //   this.isLoggedIn = false;
    // }

    // this.cartSum = 0;
    //   this.cartService.itemsInCart.forEach(item => {
    //   this.cartSum += item.item.price*item.count;
    // });
    this.calculateSumOfCart(this.cartService.itemsInCart);

    this.cartService.cartChanged.subscribe(items => {
    //   this.cartSum = 0;
    //   items.forEach(item => {
    //   this.cartSum += item.item.price*item.count;
    // });
      this.calculateSumOfCart(items);
    })
    const lang = localStorage.getItem("language");
    if (lang) {
      this.useLanguage(lang);
    }
  }

  calculateSumOfCart(cartItems: {item: Item, count: number}[]) {
    this.cartSum = 0;
      cartItems.forEach(item => {
      this.cartSum += item.item.price*item.count;
    });
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem("language",language);
  }

  onLogout() {
    this.authService.logout();
    this.authService.loggedInChanged.next(false);
  }

}
