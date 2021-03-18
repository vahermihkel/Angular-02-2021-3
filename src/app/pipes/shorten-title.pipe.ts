import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenTitle'
})
export class ShortenTitlePipe implements PipeTransform {

  transform(value: string, separatorCount?: number): string {
    // let words = value.split(" ");
    // let longWords = []; 
    if (!separatorCount) {
      separatorCount = 3;
    }
    // for(let i = 0; i<separatorCount; i++){
    //     longWords.push(words[i]); 
    // }
    // let newString = longWords.join(" ");
    // return newString;
    return value.split(" ").slice(0,separatorCount).join(" ");
    // Elas metsas mutionu keset kuuski  ---- 
    // split(" ")   ["Elas", "metsas", "mutionu", ...]
    // slice(0,3)   ["Elas", "metsas", "mutionu"]
    // join(" ")  Elas metsas mutionu
  }

}
