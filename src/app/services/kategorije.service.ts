import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Kategorija } from '../models/Kategorija';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class KategorijeService {

  serviceUrl = `${environment.apiUrl}/kategorije`;

  constructor(private http: HttpClient) { }

  public getKategorije() {
    return this.http.get<Kategorija[]>(this.serviceUrl);
  }

  public insertKategorija(kategorija: Kategorija) {
    return this.http.post<OperationResponse>(this.serviceUrl, kategorija);
  }

}

