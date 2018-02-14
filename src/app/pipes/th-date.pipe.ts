import { Pipe, PipeTransform, Inject } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeTh from '@angular/common/locales/th';
import localeThExtra from '@angular/common/locales/extra/th';

@Pipe({
  name: 'thDate'
})
export class ThDatePipe implements PipeTransform {
  transform(value: any, format: string = 'd MMMM yyyy', timezone: string = '+0700'): any {
    if (!value) {
      return '';
    }
    registerLocaleData(localeTh, 'th', localeThExtra);

    const datePipe = new DatePipe('th');
    const buddhistEraYear = (parseInt(datePipe.transform(value, 'yyyy', timezone), 10) + 543).toString();
    const extraMap = {
      'tttt': buddhistEraYear.padStart(4, '0'),
      'ttt': buddhistEraYear.padStart(3, '0'),
      'tt': buddhistEraYear.padStart(2, '0'),
      't': buddhistEraYear,
      'ค.ศ.': 'พ.ศ.',
      'คริสตศักราช': 'พุทธศักราช'
    };

    let result = datePipe.transform(value, format, timezone);
    for (const [k, v] of Object.entries(extraMap)) {
      result = result.replace(k, v);
    }
    return result;
  }

}
