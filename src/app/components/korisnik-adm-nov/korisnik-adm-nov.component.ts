import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kategorija } from 'src/app/models/Kategorija';
import { Oglas } from 'src/app/models/Oglas';
import { AuthService } from 'src/app/services/auth.service';
import { OglasiService } from 'src/app/services/oglasi.service';

@Component({
  selector: 'app-korisnik-adm-nov',
  templateUrl: './korisnik-adm-nov.component.html',
  styleUrls: ['./korisnik-adm-nov.component.scss']
})
export class KorisnikAdmNovComponent implements OnInit {

  oglas: Oglas = new Oglas();

  @Input('kategorije')
  kategorije: Kategorija[];

  @Input('korisnikID')
  korisnikID: number;

  constructor(private oglasiService: OglasiService, 
              private authService: AuthService, 
              private router: Router) { }

  ngOnInit(): void {
    this.oglas.tekst = 'Otkucajte tekst oglasa...';
    this.oglas.kategorijaID = -1;
  }

  dodajOglas(): void {
    if (this.authService.isLoggedIn()) {
      if (this.oglas.kategorijaID !== -1) {
        this.oglas.id = null;
        this.oglas.datumVazenja = null;
        this.oglas.datumObjave = new Date().toISOString().split('T')[0];
        this.oglas.korisnikID = this.korisnikID;
        // console.log(this.oglas);
        this.oglasiService.insertOglas(this.oglas).subscribe(data => {
          if (data.status === 0) {
            alert('Oglas je postavljen!');
            this.ngOnInit();
          }
          else {
            alert('Greska pri postavljanju oglasa!');
          }
        });
      }
      else {
        console.log('Morate odabrati kategoriju!');
      }
    }
    else {
      alert('Niste ulogovani!');
    }
  }

}

