import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-korisnik-adm',
  templateUrl: './korisnik-adm.component.html',
  styleUrls: ['./korisnik-adm.component.scss']
})
export class KorisnikAdmComponent implements OnInit {

  korisnickoIme: string = '';
  naslov: string = 'Dodajte nov oglas';

  oglNov: boolean = true;
  oglAkt: boolean = false;
  oglArh: boolean = false;
  oglSvi: boolean = false;

  constructor(private authService: AuthService, 
              private router: Router) { }

  ngOnInit(): void {

    if (this.authService.isLoggedIn()) {
      this.korisnickoIme = this.authService.getUsername();
    }
    else {
      this.router.navigateByUrl('/');
      alert('Morate biti prijavljeni!');
    }

  }

  novFn(): void {
    this.oglNov = true;
    this.oglAkt = false;
    this.oglArh = false;
    this.oglSvi = false;
    this.naslov = 'Dodajte nov oglas';
  }

  aktFn(): void {
    this.oglNov = false;
    this.oglAkt = true;
    this.oglArh = false;
    this.oglSvi = false;
    this.naslov = 'Aktivni oglasi';
  }

  arhFn(): void {
    this.oglNov = false;
    this.oglAkt = false;
    this.oglArh = true;
    this.oglSvi = false;
    this.naslov = 'Arhivirani oglasi';
  }

  sviFn(): void {
    this.oglNov = false;
    this.oglAkt = false;
    this.oglArh = false;
    this.oglSvi = true;
    this.naslov = 'Svi oglasi';
  }

}

