import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kategorija } from 'src/app/models/Kategorija';
import { Podkategorija } from 'src/app/models/Podkategorija';
import { AuthService } from 'src/app/services/auth.service';
import { KategorijeService } from 'src/app/services/kategorije.service';
import { PotkategorijeService } from 'src/app/services/potkategorije.service';

@Component({
  selector: 'app-administrator-adm',
  templateUrl: './administrator-adm.component.html',
  styleUrls: ['./administrator-adm.component.scss']
})
export class AdministratorAdmComponent implements OnInit {

  korisnickoIme: string = '';
  naslov: string = 'kategorije';
  kat: boolean = true;
  potkat: boolean = false;
  kategorije: Kategorija[];
  podkategorije: Podkategorija[];

  constructor(private authService: AuthService, 
              private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn() || (this.authService.getKorisnikDetails().isAdmin !== 1)) {
      this.router.navigateByUrl('/');
      alert('Morate se prijaviti sa administratorskim pravima!');
    }
  }

}

// @Component({
//   selector: 'app-administrator-adm',
//   templateUrl: './administrator-adm.component.html',
//   styleUrls: ['./administrator-adm.component.scss']
// })
// export class AdministratorAdmComponent implements OnInit {

//   korisnickoIme: string = '';
//   naslov: string = 'kategorije';
//   kat: boolean = true;
//   potkat: boolean = false;
//   kategorije: Kategorija[];
//   podkategorije: Podkategorija[];

//   constructor(private authService: AuthService, 
//               private kategorijeService: KategorijeService, 
//               private podkategorijeService: PotkategorijeService, 
//               private router: Router) { }

//   ngOnInit(): void {
//     if (this.authService.isLoggedIn() && (this.authService.getKorisnikDetails().isAdmin === 1)) {
//       this.preuzmiSveKategorije();
//       this.preuzmiSvePotkategorije();
//     }
//     else {
//       this.router.navigateByUrl('/');
//       alert('Morate se prijaviti sa administratorskim pravima!');
//     }
//   }

//   preuzmiSveKategorije() {
//     this.kategorijeService.getKategorije().subscribe(data => {
//       if (data.status === 0) {
//         this.kategorije = data.data;
//       }
//       else {
//         this.kategorije = null;
//       }
//     });
//   }

//   preuzmiSvePotkategorije() {
//     this.podkategorijeService.getPotkategorije().subscribe(data => {
//       this.podkategorije = data;
//     });
//   }

//   katFn() {
//     this.kat = true;
//     this.potkat = false;
//     this.naslov = 'kategorije';
//   }

//   potFn() {
//     this.kat = false;
//     this.potkat = true;
//     this.naslov = 'potkategorije';
//   }

//   korFn() {
//     this.kat = false;
//     this.potkat = false;
//     this.naslov = 'korisnici';
//   }

// }

