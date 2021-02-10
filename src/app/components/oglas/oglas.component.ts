import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Oglas } from 'src/app/models/Oglas';
import { OglasiService } from 'src/app/services/oglasi.service';

@Component({
  selector: 'app-oglas',
  templateUrl: './oglas.component.html',
  styleUrls: ['./oglas.component.scss']
})
export class OglasComponent implements OnInit {

  oglas: Oglas;
  oglasID: number;

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
