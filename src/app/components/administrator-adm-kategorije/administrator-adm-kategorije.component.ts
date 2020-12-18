import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrator-adm-kategorije',
  templateUrl: './administrator-adm-kategorije.component.html',
  styleUrls: ['./administrator-adm-kategorije.component.scss']
})
export class AdministratorAdmKategorijeComponent implements OnInit {

  dodKat: boolean = false;
  izmKat: boolean = false;
  uklKat: boolean = false;

  constructor() { }

  ngOnInit(): void {
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

}

