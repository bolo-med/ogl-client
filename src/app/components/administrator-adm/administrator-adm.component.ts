import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-administrator-adm',
  templateUrl: './administrator-adm.component.html',
  styleUrls: ['./administrator-adm.component.scss']
})
export class AdministratorAdmComponent implements OnInit {

  korisnickoIme: string = '';
  naslov: string = 'kategorije';

  constructor(private authService: AuthService, 
              private router: Router) { }

  ngOnInit(): void {

    if (this.authService.isLoggedIn() && (this.authService.getKorisnikDetains().isAdmin === 1)) {
      this.korisnickoIme = this.authService.getUsername();
    }
    else {
      this.router.navigateByUrl('/');
      alert('Morate se prijaviti sa administratorskim pravima!');
    }
    
  }

}

