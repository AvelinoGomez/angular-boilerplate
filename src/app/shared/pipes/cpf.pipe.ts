import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf',
  standalone: true,
})
export class CpfPipe implements PipeTransform {

  transform(cpf: unknown, ...args: unknown[]): any {
    if (cpf) {
      const value = cpf.toString().replace(/\D/g, '');

      if (value.length == 11) {
        return value.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, '$1.$2.$3-$4');
      }
      
      return value;
    }
  }

}