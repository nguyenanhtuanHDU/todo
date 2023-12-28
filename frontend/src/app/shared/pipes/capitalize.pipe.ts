import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, args: any): string {
    const specialCharRegex = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    const textSplit = value.split('')
    for (let i of textSplit) {
      if (specialCharRegex.test(i)) {
        textSplit.shift()
      }
    }
    textSplit[0] = textSplit[0].toUpperCase()
    return textSplit.join('');
  }
}
