import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public usrName: string = null;
  public accType: number = null; //tip naloga

  constructor() { }
}

