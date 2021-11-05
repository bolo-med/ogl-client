import { Pipe, PipeTransform } from '@angular/core';
import { Kategorija } from '../models/Kategorija';

@Pipe({
  name: 'nizAbc'
})
export class NizAbcPipe implements PipeTransform {

  transform(niz: Kategorija[], kljuc: string): Kategorija[] {

    if (!niz || niz.length < 1) {
      return niz;
    }

    if (niz[0][kljuc]) {
      if ( (typeof niz[0][kljuc] === 'string') || (niz[0][kljuc] instanceof String) ) {
        return niz.sort((a, b) => (a[kljuc] > b[kljuc] ? 1 : (a[kljuc] < b[kljuc]) ? -1 : 0));
      }
      // else {
      //   return niz.sort((a, b) => b[kljuc] - a[kljuc]);
      // }
    }

    return null;
  }

}

