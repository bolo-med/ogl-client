import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorAdmKategorijeComponent } from './components/administrator-adm-kategorije/administrator-adm-kategorije.component';
import { AdministratorAdmPotkategorijeComponent } from './components/administrator-adm-potkategorije/administrator-adm-potkategorije.component';
import { AdministratorAdmComponent } from './components/administrator-adm/administrator-adm.component';
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
    component: KorisnikAdmComponent
  },
  {
    path: 'administrator',
    component: AdministratorAdmComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'kategorije'},
      {path: 'kategorije', component: AdministratorAdmKategorijeComponent},
      {path: 'podkategorije', component: AdministratorAdmPotkategorijeComponent}
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
