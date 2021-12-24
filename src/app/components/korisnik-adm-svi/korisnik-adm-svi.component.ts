import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Oglas } from 'src/app/models/Oglas';
import { AuthService } from 'src/app/services/auth.service';
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
  korisnikId: number;
  duzinaNiza: number;

  constructor(private oglasiServis: OglasiService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this. duzinaNiza = 0;
    this.korisnikId = this.authService.getKorisnikDetails().id;
    this.oglasiServis.getOglasi().subscribe(data => {
      this.oglasi = this.korisnikoviOglasi(data);
    });
  }

  korisnikoviOglasi(sviOglasi: Oglas[]): Oglas[] {
    let izabraniOglasi: Oglas[] = [];
    
    for (let oglas of sviOglasi) {
      if (oglas.korisnikID === this.korisnikId) {
        izabraniOglasi.push(oglas)
      }
    }

    this.duzinaNiza = izabraniOglasi.length;
    
    return izabraniOglasi;
  }

  kliknutOglas(id: number) {
    this.router.navigateByUrl('/korisnik/oglas/' + id);
    // console.log('ID oglasa je: ' + id);
  }

}
