import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Oglas } from './../models/Oglas';
import { OperationResponse } from 'src/app/models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class OglasiService {

  serviceUrl = `${environment.apiUrl}/oglasi`;

  constructor(private http: HttpClient) {}

  public getOglasi() {
    return this.http.get<Oglas[]>(this.serviceUrl);
  }

  public getOglasByID(id: number) {
    return this.http.get<OperationResponse>(`${this.serviceUrl}/${id}`);
  }

  public insertOglas(oglas: Oglas) {
    return this.http.post<OperationResponse>(this.serviceUrl, oglas);
  }

}

