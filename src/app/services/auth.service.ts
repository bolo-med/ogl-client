import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Korisnik } from '../models/Korisnik';
import { AuthenticationResponse } from 'src/app/models/AuthenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serviseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  resister(korisnik: Korisnik) {
    return this.http.post<AuthenticationResponse>(`${this.serviseUrl}/register`, korisnik);
  }

}

