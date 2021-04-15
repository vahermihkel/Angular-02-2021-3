import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item.model';

@Pipe({
  name: 'showActiveItems'
})
export class ShowActiveItemsPipe implements PipeTransform {

  transform(value: Item[], isLoggedIn: boolean): Item[] {
    if (isLoggedIn) {
      return value;
    }
    console.log("filtreerin");
    return value.filter(item => item.isActive == true)
  }

}
