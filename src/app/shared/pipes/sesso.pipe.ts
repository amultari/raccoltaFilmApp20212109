import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sesso'
})
export class SessoPipe implements PipeTransform {

  transform(value: 'MASCHIO' | 'FEMMINA'): string {
    return value === 'MASCHIO' ? 'M' : 'F';
  }

}
