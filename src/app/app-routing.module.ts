import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorAdmKategorijeComponent } from './components/administrator-adm-kategorije/administrator-adm-kategorije.component';
import { AdministratorAdmKorisniciComponent } from './components/administrator-adm-korisnici/administrator-adm-korisnici.component';
import { AdministratorAdmKorisnikComponent } from './components/administrator-adm-korisnik/administrator-adm-korisnik.component';
import { AdministratorAdmPotkategorijeComponent } from './components/administrator-adm-potkategorije/administrator-adm-potkategorije.component';
import { AdministratorAdmComponent } from './components/administrator-adm/administrator-adm.component';
import { KorisnikAdmAktuelniComponent } from './components/korisnik-adm-aktuelni/korisnik-adm-aktuelni.component';
import { KorisnikAdmArhivaComponent } from './components/korisnik-adm-arhiva/korisnik-adm-arhiva.component';
import { KorisnikAdmNovComponent } from './components/korisnik-adm-nov/korisnik-adm-nov.component';
import { KorisnikAdmSviComponent } from './components/korisnik-adm-svi/korisnik-adm-svi.component';
import { KorisnikAdmComponent } from './components/korisnik-adm/korisnik-adm.component';
import { OglasComponent } from './components/oglas/oglas.component';
import { OglasiComponent } from './components/oglasi/oglasi.component';
import { PocetnaComponent } from './components/pocetna/pocetna.component';
import { PrijavaComponent } from './components/prijava/prijava.component';
import { RegistracijaComponent } from './components/registracija/registracija.component';


const routes: Routes = [
  {
    path: 'oglasi',
    component: OglasiComponent
  },
  {
    path: 'registracija',
    component: RegistracijaComponent
  },
  {
    path: 'korisnik',
    component: KorisnikAdmComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'oglas/nov'},
      // {path: 'nov-oglas', component: KorisnikAdmNovComponent, resolve: {katPodkat: KorisnikAdmNovResolver} },
      {path: 'oglas/nov', component: KorisnikAdmNovComponent},
      {path: 'aktuelni-oglasi', component: KorisnikAdmAktuelniComponent},
      {path: 'arhivirani-oglasi', component: KorisnikAdmArhivaComponent},
      {path: 'svi-oglasi', component: KorisnikAdmSviComponent},
      {path: 'oglas/:id', component: KorisnikAdmNovComponent}
    ]
  },
  {
    path: 'administrator',
    component: AdministratorAdmComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'kategorije'},
      {path: 'kategorije', component: AdministratorAdmKategorijeComponent},
      {path: 'podkategorije', component: AdministratorAdmPotkategorijeComponent},
      {path: 'korisnici', component: AdministratorAdmKorisniciComponent},
      {path: 'korisnici/:id', component: AdministratorAdmKorisnikComponent}
    ]
  },
  {
    path: 'prijava',
    component: PrijavaComponent
  },
  {
    path: 'oglas/:id',
    component: OglasComponent
  },
  {
    path: '',
    component: PocetnaComponent
  },
  {
    path: '*',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
