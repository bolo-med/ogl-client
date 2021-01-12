import { Component, Host, Input, OnInit } from '@angular/core';
import { Potkategorija } from 'src/app/models/Potkategorija';
import { Kategorija } from 'src/app/models/Kategorija';
import { AdministratorAdmComponent } from '../administrator-adm/administrator-adm.component';
import { PotkategorijeService } from 'src/app/services/potkategorije.service';

@Component({
  selector: 'app-administrator-adm-potkategorije',
  templateUrl: './administrator-adm-potkategorije.component.html',
  styleUrls: ['./administrator-adm-potkategorije.component.scss']
})
export class AdministratorAdmPotkategorijeComponent implements OnInit {

  odabranaPotkategorija: Potkategorija = new Potkategorija();
  odabranaKategorija: Kategorija = new Kategorija();
  prvaPotkategorija: Potkategorija = new Potkategorija();
  prvaKategorija: Kategorija = new Kategorija();
  dodPotkat: boolean = false;
  izmPotkat: boolean = false;
  filtriranePotkategorije: Potkategorija[] = [];
  nazivNovePotkategorije: string = '';
  nazivPotkatIzm: string = '';
  izabrIdKat: number = -1;

  @Input('potkategorije')
  potkategorije: Potkategorija[];

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
    this.izmPotkat = true;
  }

  dugmeOtkazi() {
    this.dodPotkat = false;
    this.nazivNovePotkategorije = '';
    this.izmPotkat = false;
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
  }

  dodajPotkategoriju() {
    let novaPotkategotija: Potkategorija = new Potkategorija();
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
    let izmPot: Potkategorija = new Potkategorija();
    // izmPot = this.odabranaPotkategorija; // Obje promenljive sadrze referencu ka istom objektu.
    izmPot.id = this.odabranaPotkategorija.id;
    izmPot.kategorijaID = +this.izabrIdKat;
    izmPot.naziv = this.nazivPotkatIzm;
    console.log(izmPot);
    
  }

  potkatNazivFn() {
    this.nazivPotkatIzm = this.odabranaPotkategorija.naziv;
  }

}

