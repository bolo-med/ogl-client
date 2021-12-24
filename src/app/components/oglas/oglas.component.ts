import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kategorija } from 'src/app/models/Kategorija';
import { Korisnik } from 'src/app/models/Korisnik';
import { Oglas } from 'src/app/models/Oglas';
import { Podkategorija } from 'src/app/models/Podkategorija';
import { AuthService } from 'src/app/services/auth.service';
import { OglasiService } from 'src/app/services/oglasi.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-oglas',
  templateUrl: './oglas.component.html',
  styleUrls: ['./oglas.component.scss']
})
export class OglasComponent implements OnInit {

  oglas: Oglas;
  oglasID: number;
  url = environment.apiUrl;

  constructor(private activatedRoute: ActivatedRoute, 
              private oglasiService: OglasiService, 
              private router: Router) { }

  ngOnInit(): void {
    
    this.oglasID = +this.activatedRoute.snapshot.paramMap.get('id');
    this.oglas = new Oglas();
    this.oglasiService.getOglasByID(this.oglasID).subscribe(data => {
      if (data.status === 0) {
        if (data.data) {
          this.oglas = data.data;
        }
        else {
          alert('Oglas ne postoji!');
          this.router.navigateByUrl('/');
        }
      }
      else {
        alert('Greska pri pretrazi oglasa!');
        this.router.navigateByUrl('/');
      }
    });
  }

}
