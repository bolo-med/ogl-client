import { Component, Input, OnInit } from '@angular/core';
import { Kategorija } from 'src/app/models/Kategorija';
import { Oglas } from 'src/app/models/Oglas';
import { Potkategorija } from 'src/app/models/Potkategorija';
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

  @Input('podkategorije')
  podkategorije: Potkategorija[];

  podkategorijeIzdvojene: Potkategorija[] = [];

  constructor(private oglasiService: OglasiService, 
              private authService: AuthService) { }

  ngOnInit(): void {
    this.oglas.tekst = 'Otkucajte tekst oglasa...';
    this.oglas.kategorijaID = 7; // id kategorije - Razno
    this.oglas.podkategorijaID = 6; // id podkategorije - Razno
  }

  dodajOglas(): void {
    if (this.authService.isLoggedIn()) {
      this.oglas.id = null;
      this.oglas.datumVazenja = null;
      this.oglas.datumObjave = new Date().toISOString().split('T')[0];
      this.oglas.korisnikID = this.korisnikID;
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
      alert('Niste ulogovani!');
    }
  }

  izdvojPodkategorije() {
    this.podkategorijeIzdvojene = [];
    for (let e of this.podkategorije) {
      if ((e.id === 6) || (e.kategorijaID === +this.oglas.kategorijaID)) { // 6 je id podkategorije - Razno
        this.podkategorijeIzdvojene.push(e);
      }
    }
    this.oglas.podkategorijaID = 6;
  }

}

