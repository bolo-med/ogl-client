import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Podkategorija } from 'src/app/models/Podkategorija';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class PotkategorijeService {

  serviceUrl = `${environment.apiUrl}/podkategorije`; // Gramaticka greska!

  constructor(private http: HttpClient) { }

  public getPotkategorije() {
    return this.http.get<Podkategorija[]>(this.serviceUrl);
  };

  public insertPotkategorija(potkategorija: Podkategorija) {
    return this.http.post<OperationResponse>(this.serviceUrl, potkategorija);
  }

  public updatePotkategorija(p: Podkategorija) {
    return this.http.put<OperationResponse>(this.serviceUrl, p);
  }

  public deletePotkategorija(id: number) {
    return this.http.delete<OperationResponse>(`${this.serviceUrl}/${id}`);
  }

}

