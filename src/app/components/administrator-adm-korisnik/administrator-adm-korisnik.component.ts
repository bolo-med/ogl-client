import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Korisnik } from 'src/app/models/Korisnik';
import { KorisniciService } from 'src/app/services/korisnici.service';
import { ValidacijaKorisnickogService } from 'src/app/services/validacija-korisnickog.service';

@Component({
  selector: 'app-administrator-adm-korisnik',
  templateUrl: './administrator-adm-korisnik.component.html',
  styleUrls: ['./administrator-adm-korisnik.component.scss']
})
export class AdministratorAdmKorisnikComponent implements OnInit {

  id: number = -1;
  korisnik: Korisnik = new Korisnik();
  formaKorisnik: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, 
              private korisniciService: KorisniciService, 
              private router: Router, 
              private formBuilder: FormBuilder, 
              private validacijaKorisnickog: ValidacijaKorisnickogService) { }

  ngOnInit(): void {
    this.nadjiKorisnika();
  }

  nadjiKorisnika() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.korisniciService.getKorisnikById(this.id).subscribe(data => {
      if (data.status === 0 && data.data) {
        this.mapirajKorisnika(data.data);
        this.kreirajFormu();
      }
      else {
        alert('Ne moze da nadje korisnika!');
        this.router.navigateByUrl('/administrator/korisnici');
      }
    });
  }

  mapirajKorisnika(k: Korisnik): void {
    this.korisnik.id = this.id;
    this.korisnik.ime = k.ime;
    this.korisnik.prezime = k.prezime;
    this.korisnik.username = k.username;
    this.korisnik.password = k.password;
    this.korisnik.isAdmin = k.isAdmin;
  }

  kreirajFormu() {
    this.formaKorisnik = this.formBuilder.group({
      'ime': [this.korisnik.ime],
      'prezime': [this.korisnik.prezime],
      'korisnicko': [ this.korisnik.username, { 
                                                validators: [Validators.required], 
                                                asyncValidators: [this.validacijaKorisnickog.validacija()], 
                                                updateOn: 'blur' 
                                             } ], 
      'admin': [this.korisnik.isAdmin] // 1 tumaci kao true, a 0 tumaci kao false
    });
  }

  izmijeni(forma: FormGroup) {
    this.mapirajFormu(forma);
    this.korisniciService.updateKorisnik(this.korisnik).subscribe(opRes => {
      if (opRes.status === 0 && opRes.data) {
        alert('Korisnik je azuriran!');
        this.router.navigateByUrl('/administrator/korisnici');
      }
      else {
        alert('Greska pri azuriranju korisnika!');
        this.router.navigateByUrl('/administrator/korisnici');
      }
    });
  }

  mapirajFormu(f: FormGroup) {
    this.korisnik.ime = f.controls['ime'].value;
    this.korisnik.prezime = f.controls['prezime'].value;
    this.korisnik.username = f.controls['korisnicko'].value;
    this.korisnik.isAdmin = f.controls['admin'].value ? 1 : 0;
  }

  provjeriKorisnicko = () => {
    console.log('aaa');
    
  };

}

