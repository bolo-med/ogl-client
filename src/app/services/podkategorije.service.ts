import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Podkategorija } from 'src/app/models/Podkategorija';

@Injectable({
  providedIn: 'root'
})
export class PodkategorijeService {

  serviceUrl = `${environment.apiUrl}/podkategorije`;

  constructor(private http: HttpClient) { }

  public getPodkategorije() {
    return this.http.get<Podkategorija[]>(this.serviceUrl);
  };

}

