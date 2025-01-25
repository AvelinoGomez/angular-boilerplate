import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpj',
  standalone: true,
})
export class CnpjPipe implements PipeTransform {

  transform(cnpj: unknown, ...args: unknown[]): any {
    if (cnpj) {
      const value = cnpj.toString().replace(/\D/g, '');

      if (value.length == 14) {
        return value.replace(/(\d{2})?(\d{3})?(\d{3})?(\d{4})?(\d{2})/, '$1.$2.$3/$4-$5');
      }
      
      return value;
    }
  }

}