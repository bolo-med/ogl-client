import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Kategorija } from 'src/app/models/Kategorija';
import { KategorijeService } from 'src/app/services/kategorije.service';
import { Podkategorija } from 'src/app/models/Podkategorija';
import { PotkategorijeService } from 'src/app/services/potkategorije.service';
import { Oglas } from 'src/app/models/Oglas';
import { OglasiService } from 'src/app/services/oglasi.service';

@Component({
  selector: 'app-korisnik-adm',
  templateUrl: './korisnik-adm.component.html',
  styleUrls: ['./korisnik-adm.component.scss']
})
export class KorisnikAdmComponent implements OnInit {

  constructor(private authService: AuthService, 
              private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
      alert('Morate se prijaviti!');
    }
  }

}

