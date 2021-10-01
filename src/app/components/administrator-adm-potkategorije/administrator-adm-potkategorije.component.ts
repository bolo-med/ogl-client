import { Component, OnInit } from '@angular/core';
import { Podkategorija } from 'src/app/models/Podkategorija';
import { Kategorija } from 'src/app/models/Kategorija';
import { PotkategorijeService } from 'src/app/services/potkategorije.service';
import { KategorijeService } from 'src/app/services/kategorije.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-administrator-adm-potkategorije',
  templateUrl: './administrator-adm-potkategorije.component.html',
  styleUrls: ['./administrator-adm-potkategorije.component.scss']
})
export class AdministratorAdmPotkategorijeComponent implements OnInit {

  odabranaPodkategorija: Podkategorija = new Podkategorija();
  odabranaKategorija: Kategorija = new Kategorija();
  prvaPodkategorija: Podkategorija = new Podkategorija();
  prvaKategorija: Kategorija = new Kategorija();
  btnDodaj: boolean = false;
  btnDodajKliknuto: boolean = false;
  btnIzmijeni: boolean = false;
  btnUkloni: boolean = false;
  filtriranePodkategorije: Podkategorija[] = [];
  nazivNovePodkategorije: string = '';
  nazivPodkatIzm: string = '';
  kategorije: Kategorija[];
  podkategorije: Podkategorija[];
  kategorijaPromjena: Kategorija = new Kategorija();

  constructor(private kategorijeServis: KategorijeService, 
              private podkategorijeServis: PotkategorijeService) {}

  ngOnInit(): void {
    this.dajSveKategorije();
    this.dajSvePodkategorije();
    this.postaviPrvuKategoriju();
    this.postaviPrvuPodkategoriju();
  }

  dajSveKategorije() {
    this.kategorijeServis.getKategorije().subscribe(data => {
      if (data.status === 0) {
        this.kategorije = data.data;
      }
      else {
        this.kategorije = null;
      }
    });
  }

  dajSvePodkategorije() {
    this.podkategorijeServis.getPotkategorije().subscribe(data => {
      if (data) {
        this.podkategorije = data;
      }
      else {
        this.podkategorije = null;
      }
    });
  }

  postaviPrvuKategoriju() {
    this.prvaKategorija.id = -1;
    this.prvaKategorija.naziv = 'Odaberite...';
    this.odabranaKategorija = this.prvaKategorija;
  }

  postaviPrvuPodkategoriju() {
    this.prvaPodkategorija.id = -1;
    this.prvaPodkategorija.kategorijaID = -1;
    this.prvaPodkategorija.naziv = 'Odaberite...';
    this.prvaPodkategorija.kategorija = null;
    this.odabranaPodkategorija = this.prvaPodkategorija;
  }

  btnDodajFn() {
    this.btnDodaj = true;
  }

  btnIzmijeniFn() {
    this.kategorijaPromjena = this.odabranaKategorija;
    this.nazivPodkatIzm = this.odabranaPodkategorija.naziv;
    this.btnIzmijeni = true;
  }

  btnUkloniFn() {
    this.btnUkloni = true;
  }

  dugmeOtkazi() {
    this.btnDodaj = false;
    this.btnIzmijeni = false;
    this.btnUkloni = false;
    this.nazivNovePodkategorije = '';
    this.btnDodajKliknuto = false;
  }

  filtrirajPodkategorije() {
    this.filtriranePodkategorije = [];
    this.odabranaPodkategorija = this.prvaPodkategorija;
    if (this.odabranaKategorija.id > 0) {
      for (let p of this.podkategorije) {
        if (p.kategorijaID === this.odabranaKategorija.id) {
          this.filtriranePodkategorije.push(p);
        }
      }
    }
  }

  dodajPodkategoriju(form: FormGroup) {
    this.btnDodajKliknuto = true;
    if (form.valid) {
      let novaPodkategotija: Podkategorija = new Podkategorija();
      novaPodkategotija.id = null;
      novaPodkategotija.kategorijaID = this.odabranaKategorija.id;
      novaPodkategotija.naziv = this.nazivNovePodkategorije;
      if (confirm('Dodati novu podkategoriju?')) {
        this.podkategorijeServis.insertPotkategorija(novaPodkategotija).subscribe(data => {
          if (data.status === 0) {
            alert('Podkategorija je dodata.');
            this.dugmeOtkazi();
            this.filtriranePodkategorije = [];
            this.ngOnInit();
          }
          else {
            alert('Doslo je do neke greske.');
            this.dugmeOtkazi();
            this.ngOnInit();
          }
        });
      }
    }
  }

  izmijeniPodkategoriju(form: FormGroup) {
    if (form.valid) {
      if (confirm('Izmijeniti podkategoriju?')) {
        let izmijenjenaPodkategorija: Podkategorija = new Podkategorija();
        izmijenjenaPodkategorija.id = this.odabranaPodkategorija.id;
        izmijenjenaPodkategorija.kategorijaID = this.kategorijaPromjena.id;
        izmijenjenaPodkategorija.naziv = this.nazivPodkatIzm;
        this.podkategorijeServis.updatePotkategorija(izmijenjenaPodkategorija).subscribe(data => {
          if (data.status === 0) {
            alert('Podkategorija je izmijenjena.');
            this.filtriranePodkategorije = [];
            this.dugmeOtkazi();
            this.ngOnInit();
          }
          else {
            alert('Greska pri izmjeni podkategorije!');
            this.dugmeOtkazi();
            this.ngOnInit();
          }
        });
      }
    }
  }

  ukloniPodkategoriju() {
    if (confirm('Ukloniti podkategoriju?')) {
      this.podkategorijeServis.deletePotkategorija(this.odabranaPodkategorija.id).subscribe(data => {
        if (data.status === 0) {
          alert('Podkategorija je uklonjena.');
          this.filtriranePodkategorije = [];
          this.dugmeOtkazi();
          this.ngOnInit();
        }
        else {
          alert('Greska pri uklanjanju podkategorije!');
          this.dugmeOtkazi();
          this.ngOnInit();
        }
      });
    }
  }

}

