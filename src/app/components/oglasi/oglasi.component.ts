import { Component, OnInit } from '@angular/core';
import { Oglas } from './../../models/Oglas';
import { OglasiService } from 'src/app/services/oglasi.service';

@Component({
  selector: 'app-oglasi',
  templateUrl: './oglasi.component.html',
  styleUrls: ['./oglasi.component.scss']
})
export class OglasiComponent implements OnInit {

  oglasi: Oglas[];

  constructor(private oglasiService: OglasiService) {
    this.oglasi = [];
  }

  ngOnInit(): void {

    this.oglasiService.getOglasi().subscribe(data => {
      this.oglasi = data;
    });

  }

}
