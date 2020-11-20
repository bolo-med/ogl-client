import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Korisnik } from '../models/Korisnik';
import { AuthenticationResponse } from 'src/app/models/AuthenticationResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serviceUrl = environment.apiUrl;

  constructor(private http: HttpClient, 
              private router: Router) {}

  resister(korisnik: Korisnik) {
    return this.http.post<AuthenticationResponse>(`${this.serviceUrl}/register`, korisnik);
  }

  login(korisnik: Korisnik) {
    return this.http.post<AuthenticationResponse>(`${this.serviceUrl}/login`, korisnik);
  }

  odjavi() {
    window.localStorage.removeItem('ogl-token');
    alert('Odjavili ste se!');
    this.router.navigateByUrl('/');
  }

  isLoggedIn() {
    let korisnik = this.getKorisnikDetains();
    if (!korisnik) return false;
    return new Date(korisnik.expiry) > new Date();
  }

  getKorisnikDetains() {
    let token = window.localStorage.getItem('ogl-token');
    if (!token) return false;
    let usrHash = token.split('.')[1];
    let korisnikStr = window.atob(usrHash);
    return JSON.parse(korisnikStr);
  }

}

