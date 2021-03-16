import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSeparator'
})
export class ThousandSeparatorPipe implements PipeTransform {

  transform(value: number | string): string {
    return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  }

}
