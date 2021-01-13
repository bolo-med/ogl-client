import { Component, Host, Input, OnInit } from '@angular/core';
import { Kategorija } from 'src/app/models/Kategorija';
import { KategorijeService } from 'src/app/services/kategorije.service';
import { AdministratorAdmComponent } from '../administrator-adm/administrator-adm.component';

@Component({
  selector: 'app-administrator-adm-kategorije',
  templateUrl: './administrator-adm-kategorije.component.html',
  styleUrls: ['./administrator-adm-kategorije.component.scss']
})
export class AdministratorAdmKategorijeComponent implements OnInit {

  dodKat: boolean = false;
  izmKat: boolean = false;
  uklKat: boolean = false;
  kategorija: Kategorija = new Kategorija();
  selektovanaKategorija: Kategorija = new Kategorija();
  prvaStavka: any;
  izmijenjeniNaziv: string = '';

  @Input('kategorije')
  kategorije: Kategorija[];

  constructor(private kategorijeService: KategorijeService, 
              @Host() private parent: AdministratorAdmComponent) {
    this.kategorija.naziv = '';
  }

  ngOnInit(): void {
    this.postaviPrvuStavku();
    this.cancBtn();
  }

  dodBtn() {
    this.dodKat = true;
    this.izmKat = false;
    this.uklKat = false;
  }

  izmBtn() {
    this.izmijenjeniNaziv = this.selektovanaKategorija.naziv;
    this.dodKat = false;
    this.izmKat = true;
    this.uklKat = false;
  }

  uklBtn() {
    this.dodKat = false;
    this.izmKat = false;
    this.uklKat = true;
  }

  cancBtn() {
    this.dodKat = false;
    this.izmKat = false;
    this.uklKat = false;
  }

  postaviPrvuStavku() {
    this.prvaStavka = {
      id: -1,
      naziv: 'Odaberite...'
    };
    this.selektovanaKategorija = this.prvaStavka;
  }

  dodajKategoriju() {
    if (confirm('Dodati kategoriju?')) {
      this.kategorija.id = null;
      this.kategorijeService.insertKategorija(this.kategorija).subscribe(data => {
        if (data.status === 0) {
          alert('Kategorija je dodata.');
          this.kategorija = new Kategorija();
          this.parent.preuzmiSveKategorije();
          this.ngOnInit();
        }
        else {
          alert('Greska pri dodavanju kategorije!');
          this.kategorija = new Kategorija();
          this.ngOnInit();
        }
      });
    }
  }

  izmijeniKategoriju() {
    if (confirm('Izmijeniti kategoriju?')) {
      let izmKateg: Kategorija = new Kategorija();
      izmKateg.id = this.selektovanaKategorija.id;
      izmKateg.naziv = this.izmijenjeniNaziv;
      this.kategorijeService.updateKategorija(izmKateg).subscribe(data => {
        if (data.status === 0) {
          alert('Kategorija je izmijenjena.');
          this.parent.preuzmiSveKategorije();
          this.ngOnInit();
        }
        else {
          alert('Greska pri izmjeni kategorije!');
          this.ngOnInit();
        }
      });
    }
  }

  ukloniKategoriju() {
    if (confirm('Ukloniti kategoriju?')) {
      this.kategorijeService.deleteKategorija(this.selektovanaKategorija.id).subscribe(data => {
        if (data.status === 0) {
          alert('Kategorija je uklonjena.');
          this.parent.preuzmiSveKategorije();
          this.ngOnInit();
        }
        else {
          alert('Greska pri uklanjanju kategorije!');
          this.ngOnInit()
        }
      });
    }
  }

}

