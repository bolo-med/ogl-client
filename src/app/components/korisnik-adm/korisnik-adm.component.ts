import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-korisnik-adm',
  templateUrl: './korisnik-adm.component.html',
  styleUrls: ['./korisnik-adm.component.scss']
})
export class KorisnikAdmComponent implements OnInit {

  korisnickoIme: string = '';

  constructor(private authService: AuthService, 
              private router: Router) { }

  ngOnInit(): void {

    if (this.authService.isLoggedIn()) {
      this.korisnickoIme = this.authService.getUsername();
    }
    else {
      this.router.navigateByUrl('/');
      alert('Morate biti prijavljeni!');
    }

  }

}
