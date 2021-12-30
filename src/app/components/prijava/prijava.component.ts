import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/models/AuthenticationResponse';
import { Korisnik } from 'src/app/models/Korisnik';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss']
})
export class PrijavaComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();
  formaPrijava: FormGroup;
  formaPotvrdjena: boolean;

  constructor(private authService: AuthService, 
              private router: Router, 
              private messageService: MessageService, 
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.formaPotvrdjena = false;

    this.kreirajFormu();

  }

  kreirajFormu() {
    this.formaPrijava = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  // prijavi(forma: FormGroup) {

  //   this.formaPotvrdjena = true;

  //   if (!forma.valid) return;

  //   this.mapirajKorisnika();
    
  //   this.authService.login(this.korisnik).subscribe(data => {
  //     if (data.status === 0) {
  //       window.localStorage.setItem('ogl-token', data.token);
  //       ///////////////////////////////////////////////////////////////
  //       this.messageService.usrName = this.authService.getUsername();
  //       this.messageService.accType = this.authService.getAccountType();
  //       //////////////////////////////////////////////////////////////////
  //       alert('Prijavili ste se!');
  //       this.router.navigateByUrl('/oglasi');
  //     }
  //     else {
  //       alert("Neuspješan pokušaj prijave!");
  //     }
  //   });
  // }

  prijavi = (forma: FormGroup): Promise<Object | AuthenticationResponse> => {

    this.formaPotvrdjena = true;

    if (!forma.valid) return;

    this.mapirajKorisnika();

    const promis = this.authService.login(this.korisnik).toPromise();

    // 'setTimeout' dodata radi simulacije procesa prijave na udaljeni server
    setTimeout(() => {
      promis.then(data => {
        if (data.status === 0) {
          window.localStorage.setItem('ogl-token', data.token);
          this.messageService.usrName = this.authService.getUsername();
          this.messageService.accType = this.authService.getAccountType();
          alert('Prijavili ste se!');
          this.router.navigateByUrl('/oglasi');
        }
        else {
          alert("Neuspješan pokušaj prijave!");
        }
      }, err => console.error(err));
    }, 1000);

    return promis;
  }

  mapirajKorisnika() {
    this.korisnik.id = null;
    this.korisnik.ime = null;
    this.korisnik.prezime = null;
    this.korisnik.username = this.formaPrijava.controls['username'].value;
    this.korisnik.password = this.formaPrijava.controls['password'].value;
    this.korisnik.isAdmin = null;
  }

}
