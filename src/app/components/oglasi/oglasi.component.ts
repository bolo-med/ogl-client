import { Component, OnInit } from '@angular/core';
import { Oglas } from './../../models/Oglas';
import { OglasiService } from 'src/app/services/oglasi.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private oglasiService: OglasiService, 
              private authService: AuthService, 
              private router: Router) {
    this.oglasi = [];
  }

  ngOnInit(): void {

    this.korisnickoIme = this.authService.getUsername();

    this.oglasiService.getOglasi().subscribe(data => {
      this.oglasi = this.oglasiAktuelni(data);
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

}

