import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { KorisniciService } from './korisnici.service';
import { map } from 'rxjs/operators';
import { Korisnik } from '../models/Korisnik';

@Injectable({
  providedIn: 'root'
})
export class ValidacijaKorisnickogService {

  constructor(private korisniciServis: KorisniciService) { }

  // postojiLiKorisnicko(korisnicko: string): Promise<boolean> {
  //   let postoji: boolean;
  //   this.korisniciServis.getKorisnikByUsername(korisnicko).toPromise().then((k: Korisnik) => {
  //     if (k) {
  //       postoji = true;
  //     }
  //     else {
  //       postoji = false;
  //     }
  //   }, error => {
  //     postoji = false;
  //   });
  //   return Promise.resolve(postoji);
  // }

  // validacija() {
  //   return (control: FormControl): { [key: string]: any } => {
  //     return this.postojiLiKorisnicko(control.value).then((result: boolean) => {

  //       console.log(result); // !!!result je stalno undefined
        
  //       if (result) {
  //         //console.log('ne postoji');
  //         return null;
  //       }
  //       else {
  //         //console.log('postoji');
  //         const error: any = {};
  //         error['korisnickoPostoji'] = true;
  //         return error;
  //       }
  //     });
  //   };
  // }

  postojiLiKorisnicko(korisnicko: string): Observable<boolean> {
    let postoji: boolean;
    this.korisniciServis.getKorisnikByUsername(korisnicko).subscribe((k: Korisnik) => {
      if (k) {
        postoji = true;
      }
      else {
        postoji = false;
      }
    });
    return of(postoji); // f-ja of konvertuje tip boolean u Observable<boolean>
  }

  validacija(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.postojiLiKorisnicko(control.value).pipe(map(res => {
        console.log(res); // stalno je undefined
        
        return res ? { korisnickoPostoji: true } : null;
      }));
    };
  }

}
