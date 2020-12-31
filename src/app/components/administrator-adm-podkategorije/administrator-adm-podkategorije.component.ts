import { Component, Input, OnInit } from '@angular/core';
import { Podkategorija } from 'src/app/models/Podkategorija';

@Component({
  selector: 'app-administrator-adm-podkategorije',
  templateUrl: './administrator-adm-podkategorije.component.html',
  styleUrls: ['./administrator-adm-podkategorije.component.scss']
})
export class AdministratorAdmPodkategorijeComponent implements OnInit {

  odabranaStavka: Podkategorija = new Podkategorija();
  prvaStavka: Podkategorija = new Podkategorija();

  @Input('podkategorije')
  podkategorije: Podkategorija[];

  constructor() { }

  ngOnInit(): void {
    this.postaviPrvuStavku();
  }

  postaviPrvuStavku() {
    this.prvaStavka.id = -1;
    this.prvaStavka.kategorijaID = -1;
    this.prvaStavka.naziv = 'Odaberite...';
    this.odabranaStavka = this.prvaStavka;
  }

}
