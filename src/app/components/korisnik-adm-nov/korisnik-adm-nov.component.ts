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

  /////////////////////////////////////////////////////////////////////////////////
  @ViewChild('fajl1', {static: false})
  inpF01: ElementRef;
  @ViewChild('fajl2', {static: false})
  inpF02: ElementRef;
  @ViewChild('fajl3', {static: false})
  inpF03: ElementRef;
  @ViewChild('fajl4', {static: false})
  inpF04: ElementRef;
  @ViewChild('fajl5', {static: false})
  inpF05: ElementRef;
  @ViewChild('fajl6', {static: false})
  inpF06: ElementRef;
  @ViewChild('fajl7', {static: false})
  inpF07: ElementRef;
  @ViewChild('fajl8', {static: false})
  inpF08: ElementRef;
  @ViewChild('fajl9', {static: false})
  inpF09: ElementRef;
  @ViewChild('fajl10', {static: false})
  inpF10: ElementRef;
  //////////////////////////////////////////////////////////////////////////////////

  oglas: Oglas = new Oglas();
  apiUrl = environment.apiUrl;
  fotografije: string[] = [];
  i: number = -1; // indeks elementa niza fotografije

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
              private authService: AuthService) {}

  ngOnInit(): void {
    this.oglas.naslov = '';
    this.oglas.tekst = '';
    this.oglas.kategorijaID = -1;
    this.oglas.podkategorijaID = -1;

    this.formirajPrazanNiz();

    this.uploader.onAfterAddingAll = (file) => {
      file.withCredentials = false;
      this.uploader.uploadAll();
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      response = JSON.parse(response);
      if(response.status === 0) {
        this.fotografije[this.i] = response.filename;
        alert('Fajl je aploudovan!');
        console.log(this.fotografije);/////////////////////////////////////////////////////////////////////////////
      }
      else {
        alert('Fajl nije aploudovan!');
      }
    };
  }

  dodajOglas(): void {
    if (this.authService.isLoggedIn()) {
      this.oglas.id = null;
      if (!this.oglas.foto01) this.oglas.foto01 = null;
      if (!this.oglas.foto02) this.oglas.foto02 = null;
      if (!this.oglas.foto03) this.oglas.foto03 = null;
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

  formirajPrazanNiz() {
    for (let i = 1; i <= 10; i++) {
      this.fotografije.push('');
    }
  }

  dajIndex(i: number): void {
    this.i = i;
  }

  resetujInputFile(i: number) {
    switch (i) {
      case 1:
        this.inpF01.nativeElement.value = '';
        this.fotografije[i-1] = '';
        break;
      case 2:
        this.inpF02.nativeElement.value = '';
        this.fotografije[i-1] = '';
        break;
      case 3:
        this.inpF03.nativeElement.value = '';
        this.fotografije[i-1] = '';
        break;
      case 4:
        this.inpF04.nativeElement.value = '';
        this.fotografije[i-1] = '';
        break;
      case 5:
        this.inpF05.nativeElement.value = '';
        this.fotografije[i-1] = '';
        break;
      case 6:
        this.inpF06.nativeElement.value = '';
        this.fotografije[i-1] = '';
        break;
      case 7:
        this.inpF07.nativeElement.value = '';
        this.fotografije[i-1] = '';
        break;
      case 8:
        this.inpF08.nativeElement.value = '';
        this.fotografije[i-1] = '';
        break;
      case 9:
        this.inpF09.nativeElement.value = '';
        this.fotografije[i-1] = '';
        break;
      case 10:
        this.inpF10.nativeElement.value = '';
        this.fotografije[i-1] = '';
    }
  }

}

