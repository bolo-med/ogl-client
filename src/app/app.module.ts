import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OglasiComponent } from './components/oglasi/oglasi.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistracijaComponent } from './components/registracija/registracija.component';
import { KorisnikAdmComponent } from './components/korisnik-adm/korisnik-adm.component';
import { AdministratorAdmComponent } from './components/administrator-adm/administrator-adm.component';
import { PrijavaComponent } from './components/prijava/prijava.component';
import { KorisnikAdmNovComponent } from './components/korisnik-adm-nov/korisnik-adm-nov.component';
import { KorisnikAdmSviComponent } from './components/korisnik-adm-svi/korisnik-adm-svi.component';
import { KorisnikAdmArhivaComponent } from './components/korisnik-adm-arhiva/korisnik-adm-arhiva.component';
import { KorisnikAdmAktuelniComponent } from './components/korisnik-adm-aktuelni/korisnik-adm-aktuelni.component';
import { AdministratorAdmKategorijeComponent } from './components/administrator-adm-kategorije/administrator-adm-kategorije.component';
import { AdministratorAdmPotkategorijeComponent } from './components/administrator-adm-potkategorije/administrator-adm-potkategorije.component';
import { OglasComponent } from './components/oglas/oglas.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PocetnaComponent } from './components/pocetna/pocetna.component';

@NgModule({
  declarations: [
    AppComponent,
    OglasiComponent,
    RegistracijaComponent,
    KorisnikAdmComponent,
    AdministratorAdmComponent,
    PrijavaComponent,
    KorisnikAdmNovComponent,
    KorisnikAdmSviComponent,
    KorisnikAdmArhivaComponent,
    KorisnikAdmAktuelniComponent,
    AdministratorAdmKategorijeComponent,
    AdministratorAdmPotkategorijeComponent,
    OglasComponent,
    PocetnaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
