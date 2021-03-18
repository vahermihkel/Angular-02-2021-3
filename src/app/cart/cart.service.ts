import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemsInCart: {item: Item, count: number}[] = [];
  cartChanged = new Subject<{item: Item, count: number}[]>();

  constructor() { }
}
