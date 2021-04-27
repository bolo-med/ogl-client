import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.scss']
})
export class PocetnaComponent implements OnInit {

  constructor(private authService: AuthService, 
              private messageService: MessageService) { }

  ngOnInit(): void {
    let ulogovan: boolean = this.authService.isLoggedIn();
    if (ulogovan) {
      this.messageService.usrName = this.authService.getUsername();
    }
    else {
      this.messageService.usrName = null;
    }
  }

}
