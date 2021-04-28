import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { MessageService } from './../../services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // title = 'ogl-client';
  usrName: string;
  isAdmin: number;

  constructor(public authService: AuthService, public messageService: MessageService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.messageService.usrName = this.authService.getUsername();
    }
    else {
      this.messageService.usrName = null;
    }
  }

  odjavi() {
    this.authService.odjavi();
    this.messageService.usrName = null;
  }

  isAdminis(mark: number): void {
    this.isAdmin = mark;
  }
  
}

