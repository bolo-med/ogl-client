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

  @Input('kategorije')
  kategorije: Kategorija[];

  constructor(private kategorijeService: KategorijeService, 
              @Host() private parent: AdministratorAdmComponent) {
    this.kategorija.naziv = '';
  }

  ngOnInit(): void {
    console.log(this.kategorije);
    this.selektovanaKategorija = this.kategorije[0];
  }

  dodBtn() {
    this.dodKat = true;
    this.izmKat = false;
    this.uklKat = false;
  }

  izmBtn() {
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

  dodajKategoriju() {
    if (confirm('Dodati kategoriju?')) {
      this.kategorija.id = null;
      this. kategorijeService.insertKategorija(this.kategorija).subscribe(data => {
        if (data.status === 0) {
          alert('Dodali ste kategoriju!');
          this.kategorija = new Kategorija();
          this.cancBtn();
          this.parent.ngOnInit();
        }
        else {
          alert('Greska pri dodavanju kategorije!');
          this.kategorija = new Kategorija();
          this.cancBtn();
          this.parent.ngOnInit();
        }
      });
    }
  }

  izmijeniKategoriju() {

  }

  selektovanaVrijednost() {
    console.log(this.selektovanaKategorija);
    
  }

}

