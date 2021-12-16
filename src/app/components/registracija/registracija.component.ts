import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/Korisnik';
import { AuthService } from 'src/app/services/auth.service';
import { ValidacijaKorisnickog } from 'src/app/validators/validacija-korisnickog.directive';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss']
})
export class RegistracijaComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();
  formaRegistracija: FormGroup;
  formaPotvrdjena: boolean;

  constructor(private authService: AuthService, 
              private router: Router, 
              private formBuilder: FormBuilder, 
              private validacijaKorisnickog: ValidacijaKorisnickog) {
                this.korisnik.id = null;
                this.korisnik.isAdmin = null;
              }

  ngOnInit(): void {

    this.formaPotvrdjena = false;

    this.kreirajFormu();

  }

  kreirajFormu() {
    this.formaRegistracija = this.formBuilder.group({
      'ime': ['', { validators: [Validators.required, Validators.pattern('[A-Z][a-z]*')] }],
      'prezime': ['', { validators: [Validators.required, Validators.pattern('[A-Z][a-z]*')] }],
      'korisnicko': ['', {validators: [Validators.required, Validators.minLength(3)], 
                          asyncValidators: [this.validacijaKorisnickog.validate.bind(this.validacijaKorisnickog)], 
                          updateOn: 'blur'}],
      'lozinka': ['', Validators.required]
    });
  }

  registruj(forma: FormGroup) {

    this.formaPotvrdjena = true;

    if (!forma.valid) return;

    this.korisnik.id = null;
    this.korisnik.isAdmin = null;
    this.mapirajFormu();

    this.authService.register(this.korisnik).subscribe(data => {
      if (data.status === 0) {
        window.localStorage.setItem('ogl-token', data.token);
        alert('Uspjesno ste se registrovali!');
        this.router.navigateByUrl('/oglasi');
      }
      else {
        alert('Doslo je do greske pri registrovanju!');
      }
    });
    
  }

  mapirajFormu() {
    this.korisnik.ime = this.formaRegistracija.controls['ime'].value;
    this.korisnik.prezime = this.formaRegistracija.controls['prezime'].value;
    this.korisnik.username = this.formaRegistracija.controls['korisnicko'].value;
    this.korisnik.password = this.formaRegistracija.controls['lozinka'].value;
  }

}

