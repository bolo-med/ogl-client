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
  korisnickoIme: string = '';

  constructor(private authService: AuthService, 
              private router: Router) { }

  ngOnInit(): void {
    this.korisnickoIme = this.authService.getUsername();
  }

  registruj() {
    this.korisnik.id = null;
    this.korisnik.isAdmin = null;
    this.authService.resister(this.korisnik).subscribe(data => {
      if (data.status === 0) {
        window.localStorage.setItem('ogl-token', data.token);
        alert('Uspjesno ste se registrovali!');
        this.router.navigateByUrl('/');
      }
      else {
        alert('Doslo je do greske pri registrovanju!');
      }
    });
  }

}

