import { Component, Host, Input, OnInit } from '@angular/core';
import { Podkategorija } from 'src/app/models/Podkategorija';
import { Kategorija } from 'src/app/models/Kategorija';
import { AdministratorAdmComponent } from '../administrator-adm/administrator-adm.component';

@Component({
  selector: 'app-administrator-adm-podkategorije',
  templateUrl: './administrator-adm-podkategorije.component.html',
  styleUrls: ['./administrator-adm-podkategorije.component.scss']
})
export class AdministratorAdmPodkategorijeComponent implements OnInit {

  odabranaPodkategorija: Podkategorija = new Podkategorija();
  odabranaKategorija: Kategorija = new Kategorija();
  prvaPodkategorija: Podkategorija = new Podkategorija();
  prvaKategorija: Kategorija = new Kategorija();
  dodPodkat: boolean = false;

  @Input('podkategorije')
  podkategorije: Podkategorija[];

  @Input('kategorije')
  kategorije: Kategorija[];

  constructor(@Host() private parent: AdministratorAdmComponent) {}

  ngOnInit(): void {
    this.postaviPrvuKategoriju();
    this.postaviPrvuPodkategoriju();
  }

  postaviPrvuKategoriju() {
    this.prvaKategorija = {
      id: -1,
      naziv: 'Odaberite...'
    };
    this.odabranaKategorija = this.prvaKategorija;
  }

  postaviPrvuPodkategoriju() {
    this.prvaPodkategorija = {
      id: -1,
      kategorijaID: -1,
      naziv: 'Odaberite...'
    };
    this.odabranaPodkategorija = this.prvaPodkategorija;
  }

  dodPodkategoriju() {
    this.dodPodkat = true;
  }

  dugmeOtkazi() {
    this.dodPodkat = false;
  }

  filtrirajPodkategorije() {
    if (this.odabranaKategorija.id === -1) {
      this.postaviPrvuPodkategoriju();
    }
    else {
      for (let e of this.podkategorije) {
        if (e.kategorijaID === this.odabranaKategorija.id) {
          console.log(e.naziv)
        };
      }
    }
  }

}
