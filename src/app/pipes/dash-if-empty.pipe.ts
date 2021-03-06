import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashIfEmpty'
})
export class DashIfEmptyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === '') {
      return '-';
    }
    return value;
  }

}
