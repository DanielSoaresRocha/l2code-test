import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return '';
    let newValue = value.toString();
    // Formata o valor para o padrão (XX) XXXXX-XXXX
    return `(${newValue.substring(0, 2)}) ${newValue.substring(
      2,
      7
    )}-${newValue.substring(7)}`;
  }
}
