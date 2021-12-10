import { Directive, forwardRef, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { KorisniciService } from '../services/korisnici.service';

@Injectable({ providedIn: 'root' })
export class ValidacijaKorisnickog implements AsyncValidator {

  constructor(private korisniciServis: KorisniciService) {}

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.korisniciServis.postojiLiKorisnicko(ctrl.value).pipe(
      map(isTaken => (isTaken ? { korisnickoPostoji: true } : null)),
      catchError(() => of(null))
    );
  }
}

@Directive({
  selector: '[appValidacijaKorisnickog]', 
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => ValidacijaKorisnickog),
      multi: true
    }
  ]
})
export class ValidacijaKorisnickogDirective {
  constructor(private validator: ValidacijaKorisnickog) { }

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}
