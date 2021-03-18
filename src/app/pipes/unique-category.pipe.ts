import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item.model';

@Pipe({
  name: 'uniqueCategory'
})
export class UniqueCategoryPipe implements PipeTransform {

  transform(value: Item[]): string[] {
    // [{item},{item},{item}]
    // ["category","category","category"]
    // mis on "tools" indeks, mis on "veinid" indeks
    // mis indeks mul praegusel hetkel for tsüklis
    // ["tools","veinid","tools", "veinid"] 
    // mis on tools index? 0, 0
    // mis on veinid index? 1, 1
    // 0,1,2,3,4,5,6
    // unikaalne: index == järjekorranumber

    return value.map(item=>item.category).filter((cat, index, array)=>
    array.indexOf(cat) == index);
  }

  // cat ---> "tools" <---,"veinid","tools", "veinid"
  // index ---> 0 <---,1,2,3,4,5,6
  // array ["tools","veinid","tools", "veinid"] 

}
