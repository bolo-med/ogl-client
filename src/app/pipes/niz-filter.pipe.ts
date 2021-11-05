import { Pipe, PipeTransform } from '@angular/core';
import { Podkategorija } from '../models/Podkategorija';

@Pipe({
  name: 'nizFilter'
})
export class NizFilterPipe implements PipeTransform {

  transform(podkategorije: Podkategorija[], kategorijaId: number): Podkategorija[] {

    let nizFiltriran: Podkategorija[] = [];

    if (!podkategorije) return podkategorije;

    for (let podkategorija of podkategorije) {
      if (podkategorija.kategorijaID === kategorijaId) {
        nizFiltriran.push(podkategorija);
      }
    }

    return nizFiltriran;
  }

}
