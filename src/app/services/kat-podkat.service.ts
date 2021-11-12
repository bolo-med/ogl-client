import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Podkategorija } from '../models/Podkategorija';
import { Kategorija } from '../models/Kategorija';
import { KatPodkat } from '../models/KatPodkat';

@Injectable({
  providedIn: 'root'
})
export class KatPodkatService {

  kategorijeUrl = `${environment.apiUrl}/kategorije`;
  podkategorijeUrl = `${environment.apiUrl}/podkategorije`;
  katPodkat: KatPodkat = new KatPodkat();

  constructor(private http: HttpClient) { }

    // public getKatPodkat(): Observable<KatPodkat> {
    //   return forkJoin(this.http.get<Kategorija[]>(this.kategorijeUrl), 
    //                   this.http.get<Podkategorija[]>(this.podkategorijeUrl)).pipe(map((data: any) => {
    //                     this.katPodkat.kategorije = data[0];
    //                     this.katPodkat.podkategorije = data[1];
    //                     return this.katPodkat}));
    // };

    // NE RADI. Mozda je zbog verzije Angulara.

}
