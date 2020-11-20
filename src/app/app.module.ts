import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';

import { FormsModule } from '@angular/forms';
import { OglasiComponent } from './components/oglasi/oglasi.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistracijaComponent } from './components/registracija/registracija.component';
import { KorisnikAdmComponent } from './components/korisnik-adm/korisnik-adm.component';
import { AdministratorAdmComponent } from './components/administrator-adm/administrator-adm.component';
import { PrijavaComponent } from './components/prijava/prijava.component';

@NgModule({
  declarations: [
    AppComponent,
    OglasiComponent,
    RegistracijaComponent,
    KorisnikAdmComponent,
    AdministratorAdmComponent,
    PrijavaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
