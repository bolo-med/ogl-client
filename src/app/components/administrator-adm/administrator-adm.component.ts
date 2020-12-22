import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kategorija } from 'src/app/models/Kategorija';
import { AuthService } from 'src/app/services/auth.service';
import { KategorijeService } from 'src/app/services/kategorije.service';

@Component({
  selector: 'app-administrator-adm',
  templateUrl: './administrator-adm.component.html',
  styleUrls: ['./administrator-adm.component.scss']
})
export class AdministratorAdmComponent implements OnInit {

  korisnickoIme: string = '';
  naslov: string = 'kategorije';
  kat: boolean = true;
  kategorije: Kategorija[] = [];

  constructor(private authService: AuthService, 
              private kategorijeService: KategorijeService, 
              private router: Router) { }

  ngOnInit(): void {

    if (this.authService.isLoggedIn() && (this.authService.getKorisnikDetains().isAdmin === 1)) {
      this.korisnickoIme = this.authService.getUsername();
      this.kategorijeService.getKategorije().subscribe(data => {
        this.kategorije = data;
      });
    }
    else {
      this.router.navigateByUrl('/');
      alert('Morate se prijaviti sa administratorskim pravima!');
    }
    
  }

  katFn() {
    this.kat = true;
  }

  podFn() {
    this.kat = false;
  }

  korFn() {
    this.kat = false;
  }

}

