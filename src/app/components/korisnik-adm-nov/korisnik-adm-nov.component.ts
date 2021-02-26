import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Kategorija } from 'src/app/models/Kategorija';
import { Oglas } from 'src/app/models/Oglas';
import { Podkategorija } from 'src/app/models/Podkategorija';
import { AuthService } from 'src/app/services/auth.service';
import { OglasiService } from 'src/app/services/oglasi.service';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-korisnik-adm-nov',
  templateUrl: './korisnik-adm-nov.component.html',
  styleUrls: ['./korisnik-adm-nov.component.scss']
})
export class KorisnikAdmNovComponent implements OnInit {

  @ViewChild('fajl1', {static: false})
  inputFajl1: ElementRef;

  oglas: Oglas = new Oglas();
  apiUrl = environment.apiUrl;
  izborFajlaPolje: string = '';
  brFajlova: number = 1;

  uploader: FileUploader = new FileUploader({
    itemAlias: 'img',
    url: `${this.apiUrl}/upload`
  });

  @Input('kategorije')
  kategorije: Kategorija[];

  @Input('korisnikID')
  korisnikID: number;

  @Input('podkategorije')
  podkategorije: Podkategorija[];

  podkategorijeIzdvojene: Podkategorija[] = [];

  constructor(private oglasiService: OglasiService, 
              private authService: AuthService) { }

  ngOnInit(): void {
    this.oglas.naslov = '';
    this.oglas.tekst = '';
    this.oglas.kategorijaID = -1;
    this.oglas.podkategorijaID = -1;

    this.uploader.onAfterAddingAll = (file) => {
      file.withCredentials = false;
      this.uploader.uploadAll();
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      response = JSON.parse(response);
      if(response.status === 0) {
        alert('Fajl je aploudovan!');
        switch (this.izborFajlaPolje) {
          case 'fajl1': {
            this.oglas.foto1 = response.filename;
            break;
          }
          case 'fajl2': {
            this.oglas.foto2 = response.filename;
            break;
          }
          case 'fajl3': {
            this.oglas.foto3 = response.filename;
            break;
          }
        }
      }
      else {
        alert('Fajl nije aploudovan!');
      }
    };
  }

  dodajOglas(): void {
    if (this.authService.isLoggedIn()) {
      this.oglas.id = null;
      this.oglas.datumObjave = new Date().toISOString().split('T')[0];
      this.oglas.datumVazenja = null;
      this.oglas.kategorijaID = +this.oglas.kategorijaID;
      this.oglas.podkategorijaID = +this.oglas.podkategorijaID;
      this.oglas.korisnikID = this.korisnikID;
      this.oglasiService.insertOglas(this.oglas).subscribe(data => {
        if (data.status === 0) {
          alert('Oglas je postavljen!');
          this.ngOnInit();
        }
        else {
          alert('Greska pri postavljanju oglasa!');
        }
      });
    }
    else {
      alert('Niste ulogovani!');
    } 
  }

  izdvojPodkategorije() {
    this.podkategorijeIzdvojene = [];
    for (let e of this.podkategorije) {
      if ((e.id === 6) || (e.kategorijaID === +this.oglas.kategorijaID)) { // 6 je id podkategorije - Razno
        this.podkategorijeIzdvojene.push(e);
      }
    }
    this.oglas.podkategorijaID = -1;
  }

  reset() {
    this.inputFajl1.nativeElement.value = '';
    this.oglas.foto1 = null;
  }

  /////////////////////////////////////////////
  promjena(fajlBr: string) {
    this.izborFajlaPolje = fajlBr;
    console.log(this.izborFajlaPolje);
  }

  brFajlovaFn() {
    this.brFajlova++;
  }

}

