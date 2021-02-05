import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // title = 'ogl-client';

  constructor(private authService: AuthService) {}

  odjavi() {
    this.authService.odjavi();
  }
  
}

