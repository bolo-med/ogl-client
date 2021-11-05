import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Kategorija } from 'src/app/models/Kategorija';
import { Oglas } from 'src/app/models/Oglas';
import { Podkategorija } from 'src/app/models/Podkategorija';
import { AuthService } from 'src/app/services/auth.service';
import { OglasiService } from 'src/app/services/oglasi.service';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { ViewChild } from '@angular/core';
import { KategorijeService } from 'src/app/services/kategorije.service';
import { PotkategorijeService } from 'src/app/services/potkategorije.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KatPodkat } from 'src/app/models/KatPodkat';

@Component({
  selector: 'app-korisnik-adm-nov',
  templateUrl: './korisnik-adm-nov.component.html',
  styleUrls: ['./korisnik-adm-nov.component.scss']
})
export class KorisnikAdmNovComponent implements OnInit {

  oglas: Oglas = new Oglas();
  oglasFormGroup: FormGroup;
  oglasFormArray: FormArray = new FormArray([]);
  danas: string = new Date().toISOString().split('T')[0];
  kategorije: Kategorija[];
  podkategorije: Podkategorija[];
  // sub: any;

  // @ViewChild('fajl1', {static: false})
  // inpF01: ElementRef;
  // @ViewChild('fajl2', {static: false})
  // inpF02: ElementRef;
  // @ViewChild('fajl3', {static: false})
  // inpF03: ElementRef;

  // oglas: Oglas = new Oglas();
  // apiUrl = environment.apiUrl;
  // fotografije: string[] = [];
  // fotografijeStr: string = '';
  // i: number = -1; // indeks elementa niza fotografije

  // uploader: FileUploader = new FileUploader({
  //   itemAlias: 'img',
  //   url: `${this.apiUrl}/upload`
  // });

  // kategorije: Kategorija[];
  // podkategorije: Podkategorija[];
  // korisnikID: number;

  // podkategorijeIzdvojene: Podkategorija[] = [];

  constructor(private oglasiService: OglasiService, 
              private authService: AuthService,  
              private formBuilder: FormBuilder, 
              private route: ActivatedRoute, 
              private router: Router, 
              private kategorijeServis: KategorijeService, 
              private podkategorijeServis: PotkategorijeService) {}

  ngOnInit(): void {

    // Ne moze ni ovo. Pocne da izvrsava tijelo f-je, prije nego sto dobije parametar 'data'. Resolver mi nicemu ne sluzi.
    // this.sub = this.route.data.subscribe((data: {katPodkat: KatPodkat}) => {
    //   if (data.katPodkat.kategorije && data.katPodkat.podkategorije) {
    //     this.kategorije = data.katPodkat.kategorije;
    //     this.podkategorije = data.katPodkat.podkategorije;
    //   }
    //   else {
    //     alert('Greska sa DB serverom!\nPokušajte kasnije.');
    //     this.router.navigateByUrl('/');
    //   }
    // });
    // Nece ni ovako.
    // this.sub = this.route.data.subscribe((data: {katPodkat: KatPodkat}) => {
    //   this.kategorije = data.katPodkat.kategorije;
    //   this.podkategorije = data.katPodkat.podkategorije;
    // });

    this.dopremiKatPodkat();

    this.oglas.id = null;
    this.oglas.datumObjave = this.danas;
    this.oglas.arhiviran = 0;
    this.oglas.korisnikID = this.authService.getKorisnikDetails().id;

    this.kreirajFormu();

    // this.kategorijeServis.getKategorije().subscribe(data => this.kategorije = data.data);
    // this.podkategorijeServis.getPotkategorije().subscribe(data => this.podkategorije = data);
    // this.korisnikID = this.authService.getKorisnikDetails().id;

    // this.oglas.naslov = '';
    // this.oglas.tekst = '';
    // this.oglas.kategorijaID = -1;
    // this.oglas.podkategorijaID = -1;

    // this.formirajPrazanNiz();

    // this.uploader.onAfterAddingAll = (file) => {
    //   file.withCredentials = false;
    //   this.uploader.uploadAll();
    // };

    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //   response = JSON.parse(response);
    //   if(response.status === 0) {
    //     this.fotografije[this.i] = response.filename;
    //     alert('Fajl je aploudovan!');
    //   }
    //   else {
    //     alert('Fajl nije aploudovan!');
    //   }
    // };
  }

  dopremiKatPodkat() {
    this.kategorijeServis.getKategorije().subscribe(data => {
      if (data.status === 0) {
        this.kategorije = data.data;
      }
    });

    this.podkategorijeServis.getPotkategorije().subscribe(data => this.podkategorije = data);
  }

  kreirajFormu() {
    this.oglasFormGroup = this.formBuilder.group({
      'naslov': [this.oglas.naslov],
      'tekst': [this.oglas.tekst],
      'datumVazenja': [this.oglas.datumVazenja],
      'kategorijaID': [this.oglas.kategorijaID],
      'podkategorijaID': [this.oglas.podkategorijaID],
      'fotografijeNiz': this.oglasFormArray.push(new FormControl(''))
    });

    this.oglasFormGroup.controls['kategorijaID'].setValue(-1);
    this.oglasFormGroup.controls['podkategorijaID'].setValue(-1);

    // this.oglasFormGroup.controls['kategorijaID'].setValue(this.kategorije[0].id);
    // this.oglasFormGroup.controls['podkategorijaID'].setValue(this.podkategorije[0].id);
  }

  kategProm(katId: number) {
    this.oglasFormGroup.controls['podkategorijaID'].setValue(-1);
    // console.log('intex stavke: vrijednost: ' + katId);
  }

  objaviOglas() {}

  // Ne treba nam. Nema resolvera.
  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }

  // dodajOglas(): void {
  //   if (this.authService.isLoggedIn()) {
  //     this.photosToStr();
  //     this.oglas.id = null;
  //     this.oglas.fotografije = this.fotografijeStr;
  //     this.oglas.datumObjave = new Date().toISOString().split('T')[0];
  //     this.oglas.datumVazenja = null;
  //     this.oglas.kategorijaID = +this.oglas.kategorijaID;
  //     this.oglas.podkategorijaID = +this.oglas.podkategorijaID;
  //     this.oglas.korisnikID = this.korisnikID;
  //     this.oglasiService.insertOglas(this.oglas).subscribe(data => {
  //       if (data.status === 0) {
  //         alert('Oglas je postavljen!');
  //         this.ngOnInit();
  //       }
  //       else {
  //         alert('Greska pri postavljanju oglasa!');
  //       }
  //     });
  //   }
  //   else {
  //     alert('Niste ulogovani!');
  //   } 
  // }

  // photosToStr() {
  //   this.fotografijeStr = '';
  //   for (let i=0; i<this.fotografije.length; i++) {
  //     if (this.fotografije[i] !== '') {
  //       this.fotografijeStr += this.fotografije[i];
  //       this.fotografijeStr += ' ';
  //     }
  //   }
  //   this.fotografijeStr = this.fotografijeStr.slice(0, this.fotografijeStr.length-1);
  // }

  // izdvojPodkategorije() {
  //   this.podkategorijeIzdvojene = [];
  //   for (let e of this.podkategorije) {
  //     if ((e.id === 6) || (e.kategorijaID === +this.oglas.kategorijaID)) { // 6 je id podkategorije - Razno
  //       this.podkategorijeIzdvojene.push(e);
  //     }
  //   }
  //   this.oglas.podkategorijaID = -1;
  // }

  // formirajPrazanNiz() {
  //   for (let i=1; i<=3; i++) {
  //     this.fotografije.push('');
  //   }
  // }

  // dajIndex(i: number): void {
  //   this.i = i;
  // }

  // resetujInputFile(i: number) {
  //   switch (i) {
  //     case 1:
  //       this.inpF01.nativeElement.value = '';
  //       this.fotografije[i-1] = '';
  //       break;
  //     case 2:
  //       this.inpF02.nativeElement.value = '';
  //       this.fotografije[i-1] = '';
  //       break;
  //     case 3:
  //       this.inpF03.nativeElement.value = '';
  //       this.fotografije[i-1] = '';
  //   }
  // }

}

