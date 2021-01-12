import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Potkategorija } from 'src/app/models/Potkategorija';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class PotkategorijeService {

  serviceUrl = `${environment.apiUrl}/podkategorije`; // Gramaticka greska!

  constructor(private http: HttpClient) { }

  public getPotkategorije() {
    return this.http.get<Potkategorija[]>(this.serviceUrl);
  };

  public insertPotkategorija(potkategorija: Potkategorija) {
    return this.http.post<OperationResponse>(this.serviceUrl, potkategorija);
  }

  

}

