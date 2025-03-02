import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    // Formata o valor para o padrão (XX) XXXXX-XXXX
    return `(${value.substring(0, 2)}) ${value.substring(
      2,
      7
    )}-${value.substring(7)}`;
  }
}
