import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Korisnik } from 'src/app/models/Korisnik';
import { KorisniciService } from 'src/app/services/korisnici.service';

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
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.nadjiKorisnika();
    this.kreirajFormu();
  }

  nadjiKorisnika() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.korisniciService.getKorisnikById(this.id).subscribe(data => {
      if (data.status === 0 && data.data) {
        this.korisnik = data.data;
        // this.kreirajFormu();
      }
      else {
        alert('Ne moze da nadje korisnika!');
        this.router.navigateByUrl('/administrator/korisnici');
      }
    });
  }

  kreirajFormu() {
    this.formaKorisnik = this.formBuilder.group({
      // 'id': [this.korisnik.id],
      // 'ime': [this.korisnik.ime],
      // 'prezime': [this.korisnik.prezime],
      // 'korisnicko': [this.korisnik.username]
      'id': '',
      'ime': 'aaa',
      'prezime': '',
      'korisnicko': ''
    });
  }

  izmijeni(forma: FormGroup) {

  }

}
