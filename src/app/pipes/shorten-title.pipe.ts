import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenTitle'
})
export class ShortenTitlePipe implements PipeTransform {

  transform(value: string, separatorCount?: number): string {
    let words = value.split(" "); // javascript arrays
    // console.log(words);
    let longWords = [];
    if (!separatorCount) {
      separatorCount = 3;
    }
    for(let i = 0; i<separatorCount; i++){  // i = i + 1    --- i += 1   ---   i++
        // console.log(i);
        // console.log(words[i])
        longWords.push(words[i]);
        // console.log(longWords);
    }
    let newString = longWords.join(" ");
    // console.log(newString);
    return newString;
  }

}
