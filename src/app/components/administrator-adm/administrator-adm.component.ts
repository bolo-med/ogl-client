import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kategorija } from 'src/app/models/Kategorija';
import { Podkategorija } from 'src/app/models/Podkategorija';
import { AuthService } from 'src/app/services/auth.service';
import { KategorijeService } from 'src/app/services/kategorije.service';
import { PodkategorijeService } from 'src/app/services/podkategorije.service';

@Component({
  selector: 'app-administrator-adm',
  templateUrl: './administrator-adm.component.html',
  styleUrls: ['./administrator-adm.component.scss']
})
export class AdministratorAdmComponent implements OnInit {

  korisnickoIme: string = '';
  naslov: string = 'kategorije';
  kat: boolean = true;
  podkat: boolean = false;
  kategorije: Kategorija[];
  podkategorije: Podkategorija[];

  constructor(private authService: AuthService, 
              private kategorijeService: KategorijeService, 
              private podkategorijeService: PodkategorijeService, 
              private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn() && (this.authService.getKorisnikDetains().isAdmin === 1)) {
      this.korisnickoIme = this.authService.getUsername();
      this.preuzmiSveKategorije();
      this.preuzmiSvePodkategorije();
    }
    else {
      this.router.navigateByUrl('/');
      alert('Morate se prijaviti sa administratorskim pravima!');
    }
  }

  preuzmiSveKategorije() {
    this.kategorijeService.getKategorije().subscribe(data => {
      if (data.status === 0) {
        this.kategorije = data.data;
      }
      else {
        this.kategorije = null;
      }
    });
  }

  preuzmiSvePodkategorije() {
    this.podkategorijeService.getPodkategorije().subscribe(data => {
      this.podkategorije = data;
    });
  }

  katFn() {
    this.kat = true;
    this.podkat = false;
    this.naslov = 'kategorije';
  }

  podFn() {
    this.kat = false;
    this.podkat = true;
    this.naslov = 'podkategorije';
  }

  korFn() {
    this.kat = false;
    this.podkat = false;
    this.naslov = 'korisnici';
  }

}

