import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemsInCart: {title: string, price: number, category: string, imgSrc: string}[] = []

  constructor() { }
}
