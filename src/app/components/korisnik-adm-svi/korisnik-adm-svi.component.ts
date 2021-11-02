import { Component, OnInit } from '@angular/core';
import { Oglas } from 'src/app/models/Oglas';
import { OglasiService } from 'src/app/services/oglasi.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-korisnik-adm-svi',
  templateUrl: './korisnik-adm-svi.component.html',
  styleUrls: ['./korisnik-adm-svi.component.scss']
})
export class KorisnikAdmSviComponent implements OnInit {

  oglasi: Oglas[];
  apiUrl = environment.apiUrl;

  constructor(private oglasiServis: OglasiService) { }

  ngOnInit(): void {
    this.oglasiServis.getOglasi().subscribe(data => {
      this.oglasi = data;
    });
  }

}
