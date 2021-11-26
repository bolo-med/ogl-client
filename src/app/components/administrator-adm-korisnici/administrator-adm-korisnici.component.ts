import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/Korisnik';
import { KorisniciService } from 'src/app/services/korisnici.service';

@Component({
  selector: 'app-administrator-adm-korisnici',
  templateUrl: './administrator-adm-korisnici.component.html',
  styleUrls: ['./administrator-adm-korisnici.component.scss']
})
export class AdministratorAdmKorisniciComponent implements OnInit {

  korisnici: Korisnik[];

  constructor(private korisniciServis: KorisniciService, private router: Router) { }

  ngOnInit(): void {
    this.korisniciServis.getKorisnici().subscribe(korisnici => this.korisnici = korisnici);
  }

  kaKorisniku(id: number) {
    this.router.navigateByUrl('/administrator/korisnici/' + id);
  }

}
