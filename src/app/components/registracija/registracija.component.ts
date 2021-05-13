import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/Korisnik';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss']
})
export class RegistracijaComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();

  constructor(private authService: AuthService, 
              private router: Router) {
                this.korisnik.id = null;
                this.korisnik.isAdmin = null;
              }

  ngOnInit(): void {}

  // registruj() {
  //   this.authService.resister(this.korisnik).subscribe(data => {
  //     if (data.status === 0) {
  //       window.localStorage.setItem('ogl-token', data.token);
  //       alert('Uspjesno ste se registrovali!');
  //       this.router.navigateByUrl('/');
  //     }
  //     else {
  //       alert('Doslo je do greske pri registrovanju!');
  //     }
  //   });
  // }

  registruj(registrForma: any): void {
    // console.log(`ID: ${this.korisnik.id}`);
    // console.log(`Ime: ${this.korisnik.ime}`);
    // console.log(`Prezime: ${this.korisnik.prezime}`);
    // console.log(`Korisn. ime: ${this.korisnik.username}`);
    // console.log(`Lozinka: ${this.korisnik.password}`);
    // console.log(`Is admin: ${this.korisnik.isAdmin}`);
    // console.log(`Templejt refrens: ${registrForma}`);
    console.log(`Templejt refrens - validno: ${registrForma.valid}`);
  }

}

