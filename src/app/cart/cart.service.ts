import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // [
  //  {title: string, price: number, category: ""},
  //  {title: string, price: number, category: ""}
  // ]

  // [
  //   {item: {title: string, price: number, category: ""}, count: 0},
  //   {item: {title: string, price: number, category: ""}, count: 0}
  // ]
  itemsInCart: {item: Item, count: number}[] = [];
  cartChanged = new Subject<{item: Item, count: number}[]>();

  constructor() { }
}
