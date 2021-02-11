import { Component, Host, Input, OnInit } from '@angular/core';
import { Podkategorija } from 'src/app/models/Podkategorija';
import { Kategorija } from 'src/app/models/Kategorija';
import { AdministratorAdmComponent } from '../administrator-adm/administrator-adm.component';
import { PotkategorijeService } from 'src/app/services/potkategorije.service';

@Component({
  selector: 'app-administrator-adm-potkategorije',
  templateUrl: './administrator-adm-potkategorije.component.html',
  styleUrls: ['./administrator-adm-potkategorije.component.scss']
})
export class AdministratorAdmPotkategorijeComponent implements OnInit {

  odabranaPotkategorija: Podkategorija = new Podkategorija();
  odabranaKategorija: Kategorija = new Kategorija();
  prvaPotkategorija: Podkategorija = new Podkategorija();
  prvaKategorija: Kategorija = new Kategorija();
  dodPotkat: boolean = false;
  izmPotkat: boolean = false;
  uklPotkat: boolean = false;
  filtriranePotkategorije: Podkategorija[] = [];
  nazivNovePotkategorije: string = '';
  nazivPotkatIzm: string = '';
  izabrIdKat: number = -1;

  @Input('potkategorije')
  potkategorije: Podkategorija[];

  @Input('kategorije')
  kategorije: Kategorija[];

  constructor(@Host() private parent: AdministratorAdmComponent, 
              private potkategorijeService: PotkategorijeService) {}

  ngOnInit(): void {
    this.postaviPrvuKategoriju();
    this.postaviPrvuPotkategoriju();
  }

  postaviPrvuKategoriju() {
    this.prvaKategorija = {
      id: -1,
      naziv: 'Odaberite...'
    };
    this.odabranaKategorija = this.prvaKategorija;
  }

  postaviPrvuPotkategoriju() {
    this.prvaPotkategorija = {
      id: -1,
      kategorijaID: -1,
      naziv: 'Odaberite...'
    };
    this.odabranaPotkategorija = this.prvaPotkategorija;
  }

  dodPotkategoriju() {
    this.dodPotkat = true;
  }

  izmPotkategoriju() {
    this.nazivPotkatIzm = this.odabranaPotkategorija.naziv;
    this.izmPotkat = true;
  }

  uklPotkategoriju() {
    this.uklPotkat = true;
  }

  dugmeOtkazi() {
    this.dodPotkat = false;
    this.nazivNovePotkategorije = '';
    this.izmPotkat = false;
    this.uklPotkat = false;
  }

  filtrirajPotkategorije() {
    this.odabranaPotkategorija = this.prvaPotkategorija;
    this.filtriranePotkategorije = [];
    if (this.odabranaKategorija.id > 0) {
      for (let e of this.potkategorije) {
        if (e.kategorijaID === this.odabranaKategorija.id) {
          this.filtriranePotkategorije.push(e);
        };
      }
    }

    /////////////////////////////////////////////////////////////
    this.izabrIdKat = this.odabranaKategorija.id;
  }

  dodajPotkategoriju() {
    let novaPotkategotija: Podkategorija = new Podkategorija();
    novaPotkategotija.id = null;
    novaPotkategotija.kategorijaID = this.odabranaKategorija.id;
    novaPotkategotija.naziv = this.nazivNovePotkategorije;

    if (confirm('Dodati novu potkategoriju?')) {
      this.potkategorijeService.insertPotkategorija(novaPotkategotija).subscribe(data => {
        if (data.status === 0) {
          alert('Podkategorija je dodata.');
          this.dugmeOtkazi();
          this.parent.preuzmiSvePotkategorije();
          this.ngOnInit();
        }
      });
    }

    this.nazivNovePotkategorije = '';
  }

  izmijeniPotkategoriju() {
    if (confirm('Izmijeniti potkategoriju?')) {
      let izmPot: Podkategorija = new Podkategorija();
      // izmPot = this.odabranaPotkategorija; // Obje promenljive sadrze referencu ka istom objektu.
      izmPot.id = this.odabranaPotkategorija.id;
      izmPot.kategorijaID = +this.izabrIdKat;
      izmPot.naziv = this.nazivPotkatIzm;
      this.potkategorijeService.updatePotkategorija(izmPot).subscribe(data => {
        if (data.status === 0) {
          alert('Potkategorija je izmijenjena?');
          this.parent.preuzmiSvePotkategorije();
          this.filtrirajPotkategorije();
          this.dugmeOtkazi();
          this.ngOnInit();
        }
        else {
          alert('Greska pri izmjeni potkategorije!');
          this.dugmeOtkazi();
          this.ngOnInit();
        }
      });
    }
  }

  ukloniPotkategoriju() {
    if (confirm('Ukloniti potkategoriju?')) {
      this.potkategorijeService.deletePotkategorija(this.odabranaPotkategorija.id).subscribe(data => {
        if (data.status === 0) {
          alert('Potkategorija je ulonjena.');
          this.parent.preuzmiSvePotkategorije();
          this.filtrirajPotkategorije();
          this.dugmeOtkazi();
          this.ngOnInit();
        }
        else {
          alert('Greska pri uklanjanju potkategorije!');
          this.dugmeOtkazi();
          this.ngOnInit();
        }
      });
    }
  }

}

