import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstname'
})
export class FirstnamePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    const fullName = value.trim();
    const firstName = fullName.split(' ')[0];
    return firstName;
  }

}
