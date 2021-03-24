import { Component, Input, OnInit } from '@angular/core';
import { Oglas } from 'src/app/models/Oglas';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-korisnik-adm-svi',
  templateUrl: './korisnik-adm-svi.component.html',
  styleUrls: ['./korisnik-adm-svi.component.scss']
})
export class KorisnikAdmSviComponent implements OnInit {

  apiUrl = environment.apiUrl;

  @Input('korisnikoviOglasi')
  oglasi: Oglas[];

  constructor() { }

  ngOnInit(): void {  }

}
