import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prvaFotoNiza'
})
export class PrvaFotoNizaPipe implements PipeTransform {

  transform(slikeStr: string): string {
    return slikeStr.split(';')[0];
  }

}

