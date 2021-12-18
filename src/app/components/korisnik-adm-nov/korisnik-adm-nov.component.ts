import { Component, OnDestroy, OnInit } from '@angular/core';
import { Kategorija } from 'src/app/models/Kategorija';
import { Oglas } from 'src/app/models/Oglas';
import { Podkategorija } from 'src/app/models/Podkategorija';
import { AuthService } from 'src/app/services/auth.service';
import { OglasiService } from 'src/app/services/oglasi.service';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
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
  fotografije: string = '';
  formaPotvrdjena: boolean;

  ////////////////////////////////////////////////////////////////////////////////
  oglasId: number;
  ////////////////////////////////////////////////////////////////////////////////
  
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
        }
      });
    }
    ///////////////////////////////////////////////////////////////////////////////////

    this.uploader.onAfterAddingAll = (file) => {
      file.withCredentials = false;
      this.uploader.uploadAll();
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      response = JSON.parse(response);
      if(response.status === 0) {
        this.fotografije += response.filename + ';';
        alert('Fajl je aploudovan!');
      }
      else {
        alert('Fajl NIJE aploudovan!');
      }
      console.log('uploader: ' + this.fotografije);
    };
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

  // kreirajNizKontrola(): FormArray {
  //   for (let nazivSlike of this.kreirajNizNazivaSlika()) {
  //     this.oglasFormArray.push(new FormControl(nazivSlike, Validators.required));
  //   }
  //   return this.oglasFormArray;
  // }

  kategProm(katId: any) {
    this.oglasFormGroup.controls['podkategorijaID'].setValue(-1);
    // console.log('intex stavke: vrijednost: ' + katId);
  }

  josPoljaFoto() {
    if (this.oglasFormArray.length < 5) {
      this.oglasFormArray.push(new FormControl('', Validators.required));
    }
  }

  ukloniPoljeFoto(index: number) {
    if (this.oglasFormArray.length > 1) {
      let n = <FormArray>this.oglasFormGroup.controls['fotografijeNiz'];

      let putanjaNiz = n.controls[index].value.split('\\');
      console.log('element: ' + putanjaNiz[putanjaNiz.length - 1] + ';');
      

      n.removeAt(index);
    }
    else if (this.oglasFormArray.length === 1) {
      this.oglasFormArray.controls[index].setValue('');
      this.fotografije = '';
    }
    console.log('ukloni polje: ' + this.fotografije);
    
  }

  objaviOglas(form: FormGroup) {
    this.formaPotvrdjena = true;

    if (!form.valid) return;

    this.oglas.id = null;
    this.oglas.naslov = form.controls['naslov'].value;
    this.oglas.tekst = form.controls['tekst'].value;
    this.oglas.datumObjave = this.danas;
    this.oglas.datumVazenja = form.controls['datumVazenja'].value;
    this.oglas.arhiviran = 0;
    this.oglas.kategorijaID = form.controls['kategorijaID'].value;
    this.oglas.podkategorijaID = form.controls['podkategorijaID'].value;
    this.oglas.korisnikID = this.authService.getKorisnikDetails().id;
    this.oglas.fotografije = this.fotografije;
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

  // Ne treba nam. Nema resolvera.
  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }

}

