import { Component, OnDestroy, OnInit } from '@angular/core';
import { Kategorija } from 'src/app/models/Kategorija';
import { Oglas } from 'src/app/models/Oglas';
import { Podkategorija } from 'src/app/models/Podkategorija';
import { AuthService } from 'src/app/services/auth.service';
import { OglasiService } from 'src/app/services/oglasi.service';
import { environment } from 'src/environments/environment';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { KategorijeService } from 'src/app/services/kategorije.service';
import { PotkategorijeService } from 'src/app/services/potkategorije.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StavkaOdaberite } from './../../validators/StavkaOdaberite';

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
  apiUrl = environment.apiUrl;
  formaPotvrdjena: boolean;
  oglasId: number;
  slikeIzBaze: string[] = [];
  indeksKontrole: number;
  maxBrFoto: number = 5;
  slikeDodate: string[] = new Array<string>(this.maxBrFoto);
  slikeSve: string[] = [];
  brKontrola: number = 0;
  
  uploader: FileUploader = new FileUploader({
    itemAlias: 'img',
    url: `${this.apiUrl}/upload`
  });

  constructor(private oglasiService: OglasiService, 
              private authService: AuthService,  
              private formBuilder: FormBuilder, 
              private router: Router, 
              private kategorijeServis: KategorijeService, 
              private podkategorijeServis: PotkategorijeService, 
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // da ne bi javljalo gresku, jer prvo pokusa da renderuje komponente tabele, pa saceka da dobije rezultate upita
    this.oglasFormGroup = this.formBuilder.group({
      'naslov': [''],
      'tekst': [''],
      'datumVazenja': [null],
      'kategorijaID': [-1],
      'podkategorijaID': [-1],
      'fotografijeNiz': this.oglasFormArray
    });

    this.formaPotvrdjena = false;
    this.dopremiKatPodkat();

    this.oglasId = +this.activatedRoute.snapshot.paramMap.get('id');

    if (!this.oglasId) {
      this.kreirajFormu();
    }
    else {
      this.oglasiService.getOglasByID(this.oglasId).subscribe(data => {
        if (data.data && data.status === 0) {
          this.oglas = data.data;
          this.kreirajFormu();
          this.popuniNizFotografijama();
        }
      });
    }

    this.uploader.onAfterAddingAll = (file: FileItem) => {
      file.withCredentials = false;
      this.uploader.uploadAll();
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      response = JSON.parse(response);
      if(response.status === 0) {
        // this.slikeSve.push(response.filename);
        this.slikeDodate[this.indeksKontrole] = response.filename;
        this.sveSlikeUNiz();
        alert('Fajl je aploudovan!');
      }
      else {
        alert('Fajl NIJE aploudovan!');
      }
      // console.log('Slike iz baze: ' + this.slikeIzBaze);
      // console.log('Dodate slike: ' + this.slikeDodate);
      // console.log('Sve slike: ' + this.slikeSve);
    };
  }

  popuniNizFotografijama() {
    let niz: string[] = this.oglas.fotografije.split(';');
    niz.pop();
    this.slikeIzBaze = niz;
    // console.log('slikeIzBaze (br): ' + this.slikeIzBaze.length);

    this.sveSlikeUNiz();
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
      'naslov': [this.oglasId ? this.oglas.naslov : '', Validators.required],
      'tekst': [this.oglasId ? this.oglas.tekst : '', Validators.required],
      'datumVazenja': [this.oglasId ? this.oglas.datumVazenja : null],
      'kategorijaID': [this.oglasId ? this.oglas.kategorijaID : -1, {validators: StavkaOdaberite.nijeOdabrao}],
      'podkategorijaID': [this.oglasId ? this.oglas.podkategorijaID : -1, StavkaOdaberite.nijeOdabrao],
      // 'fotografijeNiz': this.oglasFormArray.push(new FormControl('')) // ovako ne moze - mora preko f-je
      'fotografijeNiz': this.prvaContrlNiz()
    });
  }

  prvaContrlNiz(): FormArray {
    // this.oglasFormArray.push(new FormControl('', Validators.required));
    this.oglasFormArray.push(new FormControl(''));
    this.brKontrola++;
    return this.oglasFormArray;
  }

  kategProm(katId: any) {
    this.oglasFormGroup.controls['podkategorijaID'].setValue(-1);
    // console.log('intex stavke: vrijednost: ' + katId);
  }

  josPoljaFoto() {
    if (this.slikeIzBaze.length + this.brKontrola < this.maxBrFoto) {
      this.oglasFormArray.push(new FormControl(''));
      this.brKontrola++;
    }
  }

  ukloniPoljeFoto(index: number) {
    let n = <FormArray>this.oglasFormGroup.controls['fotografijeNiz'];
    let nazivFajla: string = this.slikeDodate[index];

    if (this.oglasFormArray.length > 1) {
      n.removeAt(index); // Uklanja kontrolu iz html-a
      this.slikeDodate.splice(index, 1);
      this.slikeDodate.push('');
      this.brKontrola--;
    }
    else if (this.oglasFormArray.length === 1) {
      this.oglasFormArray.controls[index].setValue('');
      this.slikeDodate.splice(index, 1);
      this.slikeDodate.push('');
    }
    this.sveSlikeUNiz();
    // console.log('Slike iz baze: ' + this.slikeIzBaze);
    // console.log('Dodate slike: ' + this.slikeDodate);
    // console.log('Sve slike: ' + this.slikeSve);
  }

  ukloniSliku(naziv: string) {

    if (!confirm('Ukloniti sliku?')) return;

    let i: number = this.slikeDodate.indexOf(naziv);
    if (i > -1) {
      let n = <FormArray>this.oglasFormGroup.controls['fotografijeNiz'];
      n.removeAt(i);
      this.brKontrola--;
      this.slikeDodate.splice(i, 1);
      this.slikeDodate.push('');
    }
    else {
      i = this.slikeIzBaze.indexOf(naziv);
      this.slikeIzBaze.splice(i, 1);
    }
    // console.log('Kao uklonjena slika: ' + naziv);
    this.sveSlikeUNiz();
    // console.log('Slike iz baze: ' + this.slikeIzBaze);
    // console.log('Dodate slike: ' + this.slikeDodate);
    // console.log('Sve slike: ' + this.slikeSve);
  }

  potvrdiOglas(form: FormGroup) {
    this.formaPotvrdjena = true;

    if (!form.valid) return;

    if (!this.oglas.id) this.oglas.id = null;
    this.oglas.naslov = form.controls['naslov'].value;
    this.oglas.tekst = form.controls['tekst'].value;
    if (!this.oglas.datumObjave) this.oglas.datumObjave = this.danas;
    this.oglas.datumVazenja = form.controls['datumVazenja'].value;
    this.oglas.arhiviran = 0;
    this.oglas.kategorijaID = form.controls['kategorijaID'].value;
    this.oglas.podkategorijaID = form.controls['podkategorijaID'].value;
    this.oglas.korisnikID = this.authService.getKorisnikDetails().id;
    this.oglas.fotografije = this.nizSlikaStr(this.slikeSve);

    this.oglas.kategorija = null;
    this.oglas.podkategorija = null;
    this.oglas.korisnik = null;

    if (this.oglasId) {
      this.izmijeniOglas(this.oglas);
    }
    else {
      this.dodajOglas(this.oglas);
    }
    // console.log(this.oglas);
  }

  izmijeniOglas(oglas: Oglas) {
    this.oglasiService.updateOglas(oglas).subscribe(odgovor => {
      if (odgovor.status === 0 && odgovor.data) {
        alert('Oglas je uspješno izmijenjen u bazi podataka!');
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate(['/korisnik/svi-oglasi']));
      }
      else {
        alert('Greška pri izmjeni oglasa u bazi podataka. Pokušajte kasnije.');
      }
    });

    console.log(oglas);
  }

  dodajOglas(oglas: Oglas) {
    this.oglasiService.insertOglas(oglas).subscribe(odgovor => {
      if (odgovor.status === 0) {
        alert('Oglas je uspješno dodat u bazu podataka!');
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate(['/korisnik/svi-oglasi']));
      }
      else {
        alert('Greška pri dodavanju oglasa u bazu podataka. Pokušajte kasnije.');
      }
    });
  }

  // Vraca indeks elementa, clana niza 'oglasFormGroup.controls['fotografijeNiz']'
  dodataSlika(index: number): void {
    this.indeksKontrole = index;
  }

  sveSlikeUNiz() {
    this.slikeSve = [];
    for (let e of this.slikeIzBaze) {
      this.slikeSve.push(e);
    }
    for (let e of this.slikeDodate) {
      if (e) this.slikeSve.push(e);
    }
  }

  nizSlikaStr(slike: string[]): string {
    let slikeStr = '';
    for (let slika of slike) {
      slikeStr += slika + ';'
    }
    return slikeStr;
  }

  ukloniOglas() {
    if (!confirm('Ukloniti oglas?')) return;
    
    this.oglasiService.deleteOglas(this.oglasId).subscribe(data => {
      if (data.status === 0) {
        alert('Oglas je uklonjen iz baze podataka!');
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate(['/korisnik/svi-oglasi']));
      }
      else {
        alert('Doslo je do greske pri uklanjanju oglasa!');
        console.log(data.data.message);
      }
    });
  }

}

