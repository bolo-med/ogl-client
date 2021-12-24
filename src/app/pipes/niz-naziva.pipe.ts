import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nizNazivaSlika'
})
export class NizNazivaPipe implements PipeTransform {

  transform(nazivi: string): string[] {
    if (nazivi) {
      let nizNaziva: string[];
      nizNaziva = nazivi.split(';');
      nizNaziva.pop();
      return nizNaziva;
    }
    return null;
  }

}
