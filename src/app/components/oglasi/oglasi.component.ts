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
  kategorijeChecked: any[] = []; // kategorije sa dodatnom kolonom - checked
  podkategorije: Podkategorija[] = [];
  podkategorijeIzabrane: any[] = [];
  oglasiPoKategorijama: Oglas[] = [];
  podkategorijeIzabraneChecked: any[] = [];
  oglasiIzabrani: Oglas[] = [];
  podkategorijeChecked: any[] = []; // Podkategorije sa dodatnom kolonom - checked
  oglasiPoPodkategorijama: Oglas[] = [];

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
      this.oglasiIzabrani = this.oglasi;
      this.oglasiPoKategorijama = this.oglasi;
    });

    this.kategorijeService.getKategorije().subscribe(data => {
      if (data.status === 0) {
        this.kategorije = data.data;
        this.kategorijeChecked = this.konvertujTipKategorije(this.kategorije);
      }
    });

    this.podkategorijeService.getPotkategorije().subscribe(data => {
      this.podkategorije = data;
      this.podkategorijeChecked = this.konvertujTipPodkatekorije(this.podkategorije);
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

  konvertujTipKategorije(kategorije: Kategorija[]): any[] {
    let kChk: any[] = [];
    for (let kat of kategorije) {
      kChk.push({
        id: kat.id,
        naziv: kat.naziv,
        checked: false
      });
    }
    return kChk;
  }

  konvertujTipPodkatekorije(podkategorije: Podkategorija[]): any[] {
    let podkChk: any[] = [];
    for (let podkat of podkategorije) {
      podkChk.push({
        id: podkat.id,
        kategorijaID: podkat.kategorijaID,
        naziv: podkat.naziv,
        kategorija: podkat.kategorija,
        checked: false
      });
    }
    return podkChk;
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
        for (let podkat of this.podkategorijeChecked) {
          if (podkat.kategorijaID === kat.id) {
            this.podkategorijeIzabrane.push(podkat);
          }
        }
      }
    }
  }

  izaberiPoKategorijama(): void {
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
    /////////////////////////////////////////////////////////////////////////
    for (let o of this.oglasiPoKategorijama) {
      console.log(o.kategorija.naziv);
      console.log(' ');
    }
    ////////////////////////////////////////////////////////////////////////
    // this.izaberiOglase(this.oglasiPoKategorijama, this.oglasiPoPodkategorijama);
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
    this.podkategorijeIzabrane[i].checked = !this.podkategorijeIzabrane[i].checked;
    this.izaberiPoPodkategorijama();
  }

  izaberiPoPodkategorijama() {
    if (this.isAllPodkatCheckedUnckecked()) {
      this.oglasiPoPodkategorijama = this.oglasiPoKategorijama;
    }
    else {
      this.oglasiPoPodkategorijama = [];
      for (let ogl of this.oglasiPoKategorijama) {
        for (let podkat of this.podkategorijeIzabrane) {
          if (ogl.podkategorijaID === podkat.id) {
            this.oglasiPoPodkategorijama.push(ogl);
          }
        }
      }
    }
    this.oglasiIzabrani = this.oglasiPoPodkategorijama;
  }

  isAllPodkatCheckedUnckecked(): boolean {
    if (this.podkategorijeIzabrane[0].checked === true) {
      for (let podkat of this.podkategorijeIzabrane) {
        if (podkat.checked === false) {
          return false;
        }
      }
      return true;
    }
    else {
      for (let podkat of this.podkategorijeIzabrane) {
        if (podkat.checked === true) {
          return false;
        }
      }
      return true;
    }
  }

}

