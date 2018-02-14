import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'thDate'
})
export class ThDatePipe implements PipeTransform {

  transform(value: any, format: string = 'd MMMM T tttt', timezone: string = '+0700', locale: string = 'th'): any {
    if (!value) {
      return '';
    }
    const datePipe = new DatePipe(locale);
    const thYear = (parseInt(datePipe.transform(value, 'yyyy', timezone), 10) + 543).toString();
    const extraMap = {
      'tttt': thYear.padStart(4, '0'),
      'ttt': thYear.padStart(3, '0'),
      'tt': thYear.padStart(2, '0'),
      't': thYear[0],
      'T': 'พ.ศ.'
    };
    let result = datePipe.transform(value, format, timezone);
    for (const [k, v] of Object.entries(extraMap)) {
      result = result.replace(k, v);
    }
    return result;
  }

}
