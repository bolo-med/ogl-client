import { Component, EventEmitter, Host, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/Korisnik';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss']
})
export class PrijavaComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();

  @Output()
  private isAdmin: EventEmitter<number>;

  constructor(private authService: AuthService, 
              private router: Router, 
              private messageService: MessageService) {}

  ngOnInit(): void {}

  prijavi() {
    this.korisnik.id = null;
    this.korisnik.ime = null;
    this.korisnik.prezime = null;
    this.korisnik.isAdmin = null;
    this.authService.login(this.korisnik).subscribe(data => {
      if (data.status === 0) {
        window.localStorage.setItem('ogl-token', data.token);
        this.messageService.usrName = this.authService.getUsername();
        ////////////////////////////////////////
        this.isAdmin.emit(this.authService.getKorisnikDetails().isAdmin);// ovo je undefined. problen sa redosledom izvrsavanja
        ///////////////////////////////////////
        alert('Prijavili ste se!');
        this.router.navigateByUrl('/');
      }
      else {
        alert("Neuspjesan pokusaj prijave!");
      }
    });
  }

}
