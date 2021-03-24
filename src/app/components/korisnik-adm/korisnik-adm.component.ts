import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Kategorija } from 'src/app/models/Kategorija';
import { KategorijeService } from 'src/app/services/kategorije.service';
import { Podkategorija } from 'src/app/models/Podkategorija';
import { PotkategorijeService } from 'src/app/services/potkategorije.service';
import { Oglas } from 'src/app/models/Oglas';
import { OglasiService } from 'src/app/services/oglasi.service';

@Component({
  selector: 'app-korisnik-adm',
  templateUrl: './korisnik-adm.component.html',
  styleUrls: ['./korisnik-adm.component.scss']
})
export class KorisnikAdmComponent implements OnInit {

  korisnickoIme: string = '';
  naslov: string = 'Dodajte nov oglas';
  kategorije: Kategorija[];
  korisnikID: number = -1;
  podkategorije: Podkategorija[];
  korisnikoviOglasi: Oglas[] = [];

  oglNov: boolean = true;
  oglAkt: boolean = false;
  oglArh: boolean = false;
  oglSvi: boolean = false;

  constructor(private authService: AuthService, 
              private router: Router, 
              private kategorijeService: KategorijeService, 
              private potkategorijeService: PotkategorijeService, 
              private oglasiService: OglasiService) { }

  ngOnInit(): void {

    if (this.authService.isLoggedIn()) {
      this.korisnickoIme = this.authService.getUsername();
      this.korisnikID = this.authService.getKorisnikDetails().id;
      this.kategorijeService.getKategorije().subscribe(data => {
        this.kategorije = data.data;
      });
      this.potkategorijeService.getPotkategorije().subscribe(data => {
        this.podkategorije = data;
      });
      this.oglasiService.getOglasi().subscribe(data => {
        this.korisnikoviOglasi = this.izdvojKorisnikoveOglase(data);
      });
    }
    else {
      this.router.navigateByUrl('/');
      alert('Morate biti prijavljeni!');
    }

  }

  izdvojKorisnikoveOglase(sviOglasi: Oglas[]): Oglas[] {
    let usrOgl: Oglas[] = []
    for (let o of sviOglasi) {
      if (o.korisnikID === this.korisnikID) {
        usrOgl.push(o);
      }
    }
    return usrOgl;
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
    this.naslov = 'Aktuelni oglasi';
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

