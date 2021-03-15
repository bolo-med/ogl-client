import { Component, OnInit } from '@angular/core';
import { Oglas } from './../../models/Oglas';
import { OglasiService } from 'src/app/services/oglasi.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { KategorijeService } from 'src/app/services/kategorije.service';
import { Kategorija } from 'src/app/models/Kategorija';
import { Podkategorija } from 'src/app/models/Podkategorija';
import { PotkategorijeService } from 'src/app/services/potkategorije.service';

@Component({
  selector: 'app-oglasi',
  templateUrl: './oglasi.component.html',
  styleUrls: ['./oglasi.component.scss']
})
export class OglasiComponent implements OnInit {

  oglasi: Oglas[];
  korisnickoIme: string = '';
  oglKliknut: boolean;
  oglKliknutId: number;
  izabraniOglas: Oglas;
  apiUrl = environment.apiUrl;
  kategorije: Kategorija[] = [];
  kategorijeChecked: any[] = [];
  podkategorije: Podkategorija[] = [];
  podkategorijeIzabrane: Podkategorija[] = [];
  oglasiPoKategorijama: Oglas[] = [];
  podkategorijeIzabraneChecked: any[] = [];

  constructor(private oglasiService: OglasiService, 
              private authService: AuthService, 
              private router: Router, 
              private kategorijeService: KategorijeService, 
              private podkategorijeService: PotkategorijeService) {
    this.oglasi = [];
  }

  ngOnInit(): void {

    this.korisnickoIme = this.authService.getUsername();

    this.oglasiService.getOglasi().subscribe(data => {
      this.oglasi = this.oglasiAktuelni(data);
      this.oglasiPoKategorijama = this.oglasi;
    });

    this.kategorijeService.getKategorije().subscribe(data => {
      if (data.status === 0) {
        this.kategorije = data.data;
        this.konvertujTipKategorije(this.kategorije);
      }
    });

    this.podkategorijeService.getPotkategorije().subscribe(data => {
      this.podkategorije = data;
    });

    this.oglKliknut = false;
    this.oglKliknutId = -1;
    this.izabraniOglas = new Oglas();
  }

  oglasiAktuelni(ogl: Oglas[]): Oglas[] {
    let oglAkt: Oglas[] = [];
    for (let e of ogl) {
      if (e.arhiviran === 0) {
        oglAkt.push(e);
      }
    }
    return oglAkt;
  }

  clickOgl(id: number) {
    if (this.oglKliknutId !== id) {
      this.oglKliknutId = id;
      this.oglKliknut = true;
    }
    else if (this.oglKliknutId === id && this.oglKliknut === false) {
      this.oglKliknut = true;
    }
    else {
      this.oglKliknut = false;
    }
  }

  proslediId(id: number) {
    this.router.navigateByUrl('/oglas/' + id);
  }

  konvertujTipKategorije(kategorije: Kategorija[]): void {
    let i: number = 0;
    for (let kat of kategorije) {
      this.kategorijeChecked[i] = {
        id: kat.id,
        naziv: kat.naziv,
        checked: false
      };
      i++;
    }
  }

  kategorijeChanged(i: number): void {
    this.kategorijeChecked[i].checked = !this.kategorijeChecked[i].checked;
    this.izaberiPodkategorije();
    this.izaberiPoKategorijama();
  }

  izaberiPodkategorije() {
    this.podkategorijeIzabrane = [];
    for (let kat of this.kategorijeChecked) {
      if (kat.checked) {
        for (let podkat of this.podkategorije) {
          if (podkat.kategorijaID === kat.id) {
            this.podkategorijeIzabrane.push(podkat);
          }
        }
      }
    }
    this.konvertujTipPodkategorije();
  }

  konvertujTipPodkategorije() {
    for (let podkatIzabr of this.podkategorijeIzabrane) {
      this.podkategorijeIzabraneChecked.push({
        id: podkatIzabr.id,
        kategorijaID: podkatIzabr.kategorijaID,
        naziv: podkatIzabr.naziv,
        kategorija: podkatIzabr.kategorija,
        checked: false
      });
    }
  }

  izaberiPoKategorijama() {
    this.oglasiPoKategorijama = [];
    if (this.isSveKategorijeOdcekirane()) {
      this.oglasiPoKategorijama = this.oglasi;
    }
    else {
      for (let ogl of this.oglasi) {
        for (let kat of this.kategorijeChecked) {
          if (kat.checked) {
            if (kat.id === ogl.kategorijaID) {
              this.oglasiPoKategorijama.push(ogl);
            }
          }
        }
      }
    }
  }

  isSveKategorijeOdcekirane(): boolean {
    for (let kat of this.kategorijeChecked) {
      if (kat.checked) {
        return false;
      }
    }
    return true;
  }

  podkatChanged(i: number) {
    this.podkategorijeIzabraneChecked[i].checked = !this.podkategorijeIzabraneChecked[i].checked;
    let ogl: Oglas[] = this.oglasiPoKategorijama;
    this.oglasiPoKategorijama = [];
    for (let pkat of this.podkategorijeIzabraneChecked) {
      if (pkat.checked === true) {
        for (let o of ogl) {
          if (pkat.id === o.podkategorijaID) {
            this.oglasiPoKategorijama.push(o);
          }
        }
      }
    }
  }

}

