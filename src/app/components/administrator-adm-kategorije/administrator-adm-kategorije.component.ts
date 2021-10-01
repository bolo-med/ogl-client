import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Kategorija } from 'src/app/models/Kategorija';
import { KategorijeService } from 'src/app/services/kategorije.service';

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
  prvaStavka: Kategorija = new Kategorija();
  izmijenjeniNaziv: string = '';

  kategorije: Kategorija[];
  potvrdio: boolean;

  constructor(private kategorijeService: KategorijeService) {
    this.kategorija.naziv = '';
  }

  ngOnInit(): void {
    this.preuzmiSveKategorije();
    this.postaviPrvuStavku();
    this.cancBtn();
    this.potvrdio = false;
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
    this.potvrdio = false;
  }

  postaviPrvuStavku() {
    this.prvaStavka.id = -1;
    this.prvaStavka.naziv = 'Odaberite...';
    this.selektovanaKategorija = this.prvaStavka;
  }

  dodajKategoriju() {
    if (confirm('Dodati kategoriju?')) {
      this.kategorija.id = null;
      this.kategorijeService.insertKategorija(this.kategorija).subscribe(data => {
        if (data.status === 0) {
          alert('Kategorija je dodata.');
          this.kategorija = new Kategorija();
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
          this.ngOnInit();
        }
        else {
          alert('Greska pri uklanjanju kategorije!');
          this.ngOnInit()
        }
      });
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

  potvrdi(form: FormGroup) {
    this.potvrdio = true;
    if (form.valid) {
      if (form.controls['dodaj']) {
        this.dodajKategoriju();
      }
      else if (form.controls['izmijeni']) {
        this.izmijeniKategoriju();
      }
      else if (form.controls['ukloni']) {
        this.ukloniKategoriju();
      }
    }
  }

}

