import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Korisnik } from '../models/Korisnik';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {

  serviceUrl = `${environment.apiUrl}/korisnici`;

  constructor(private http: HttpClient) {}

  getKorisnici() {
    return this.http.get<Korisnik[]>(this.serviceUrl);
  }

  getKorisnikById(id: number) {
    return this.http.get<OperationResponse>(`${this.serviceUrl}/${id}`);
  }

}

