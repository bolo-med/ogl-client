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
  // sub: any;
  apiUrl = environment.apiUrl;
  // fotografije: string = '';
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
              private route: ActivatedRoute, 
              private router: Router, 
              private kategorijeServis: KategorijeService, 
              private podkategorijeServis: PotkategorijeService, 
              private activatedRoute: ActivatedRoute) {}

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

    // da ne bi javljalo gresku, jer prvo pokusa da renderuje componente tabele, pa saceka da dobije rezultate upita
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
    // this.kreirajFormu();

    ////////////////////////////////////////////////////////////////////////////////////

    this.oglasId = +this.activatedRoute.snapshot.paramMap.get('id');

    if (!this.oglasId) {
      this.kreirajFormu();
    }
    else {

      this.oglasiService.getOglasByID(this.oglasId).subscribe(data => {
        if (data.data && data.status === 0) {
          this.oglas = data.data;
          this.kreirajFormu2();
          this.popuniNizFotografijama();
        }
      });
    }
    ///////////////////////////////////////////////////////////////////////////////////

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
      console.log('Slike iz baze: ' + this.slikeIzBaze);
      console.log('Dodate slike: ' + this.slikeDodate);
      console.log('Sve slike: ' + this.slikeSve);
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
      'naslov': ['', Validators.required],
      'tekst': ['', Validators.required],
      'datumVazenja': [null],
      // 'kategorijaID': [{value: this.oglas.kategorijaID}, {validators: StavkaOdaberite.nijeOdabrao}], (nepotreban red)
      'kategorijaID': [-1, {validators: StavkaOdaberite.nijeOdabrao}],
      'podkategorijaID': [-1, StavkaOdaberite.nijeOdabrao],
      // 'fotografijeNiz': this.oglasFormArray.push(new FormControl('')) // ovako ne moze - mora preko f-je
      'fotografijeNiz': this.prvaContrlNiz()
    });
    
    // Ne treba ???
    //this.oglasFormGroup.controls['kategorijaID'].setValue(-1);
    //this.oglasFormGroup.controls['podkategorijaID'].setValue(-1);
  }

  prvaContrlNiz(): FormArray {
    // this.oglasFormArray.push(new FormControl('', Validators.required));
    this.oglasFormArray.push(new FormControl(''));
    this.brKontrola++;
    return this.oglasFormArray;
  }

  kreirajFormu2() {
    this.oglasFormGroup = this.formBuilder.group({
      'naslov': [this.oglas.naslov, Validators.required],
      'tekst': [this.oglas.tekst, Validators.required],
      'datumVazenja': [null],
      'kategorijaID': [this.oglas.kategorijaID, {validators: StavkaOdaberite.nijeOdabrao}],
      'podkategorijaID': [this.oglas.podkategorijaID, StavkaOdaberite.nijeOdabrao],
      'fotografijeNiz': this.prvaContrlNiz()
    });
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
      // this.ukloniNaziv(nazivFajla);
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
    console.log('Slike iz baze: ' + this.slikeIzBaze);
    console.log('Dodate slike: ' + this.slikeDodate);
    console.log('Sve slike: ' + this.slikeSve);
  }

  ukloniSliku(naziv: string) {
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
    console.log('Kao uklonjena slika: ' + naziv);
    this.sveSlikeUNiz();
    console.log('Slike iz baze: ' + this.slikeIzBaze);
    console.log('Dodate slike: ' + this.slikeDodate);
    console.log('Sve slike: ' + this.slikeSve);
  }

  objaviOglas(form: FormGroup) {
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
    this.oglas.fotografijeNiz = [];
    this.oglasiService.insertOglas(this.oglas).subscribe(odgovor => {
      if (odgovor.status === 0) {
        alert('Oglas je uspješno postavljen.');
        this.ngOnInit();
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate(['/korisnik/nov-oglas']));
      }
      else {
        alert('Greška pri postavljanju oglasa. Pokušajte kasnije.');
        // this.router.navigateByUrl('/');
      }
    });
    // console.log(this.oglas);
  }

  // Vraca indeks elementa, clana niza 'oglasFormGroup.controls['fotografijeNiz']'
  dodataSlika(index: number): void {
    //console.log(index);
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
    // console.log(this.slikeSve);
    
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
      }
    });
  }

  // Ne treba nam. Nema resolvera.
  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }

}

