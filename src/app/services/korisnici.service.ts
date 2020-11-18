import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {

  serviceUrl = `${environment.apiUrl}/oglasi`;

  constructor(private http: HttpClient) {}

}

