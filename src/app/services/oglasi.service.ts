import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Oglas } from './../models/Oglas';

@Injectable({
  providedIn: 'root'
})
export class OglasiService {

  serviceUrl = `${environment.apiUrl}/oglasi`;

  constructor(private http: HttpClient) {}

  public getOglasi() {
    return this.http.get<Oglas[]>(this.serviceUrl);
  }

}

