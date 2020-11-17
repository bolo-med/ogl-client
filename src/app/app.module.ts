import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';

import { FormsModule } from '@angular/forms';
import { OglasiComponent } from './components/oglasi/oglasi.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistracijaComponent } from './components/registracija/registracija.component';

@NgModule({
  declarations: [
    AppComponent,
    OglasiComponent,
    RegistracijaComponent
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
