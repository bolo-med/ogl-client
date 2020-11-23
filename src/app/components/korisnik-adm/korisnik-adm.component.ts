import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-korisnik-adm',
  templateUrl: './korisnik-adm.component.html',
  styleUrls: ['./korisnik-adm.component.scss']
})
export class KorisnikAdmComponent implements OnInit {

  poruka: string = "Morate biti prijavljeni!"
  korisnickoIme: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.korisnickoIme = this.authService.getUsername();

    if (window.localStorage.getItem('ogl-token') && this.authService.isLoggedIn()) {
      this.poruka = `Prijavljeni ste kao ${this.authService.getKorisnikDetains().username}!`;
    }

  }

}
