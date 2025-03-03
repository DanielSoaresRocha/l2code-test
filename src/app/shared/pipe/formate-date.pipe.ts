import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
})
export class FormateDatePipe implements PipeTransform {
  transform(date: Date): unknown {
    if (date) return new Date(date).toLocaleDateString('pt-br');
    return undefined;
  }
}
