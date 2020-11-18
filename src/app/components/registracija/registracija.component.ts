import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/Korisnik';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss']
})
export class RegistracijaComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();

  constructor() { }

  ngOnInit(): void {
  }

  registruj() {
    this.korisnik.id = null;
    this.korisnik.isAdmin = null;
  }

}

