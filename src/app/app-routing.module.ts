import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorAdmComponent } from './components/administrator-adm/administrator-adm.component';
import { KorisnikAdmComponent } from './components/korisnik-adm/korisnik-adm.component';
import { OglasiComponent } from './components/oglasi/oglasi.component';
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
    component: AdministratorAdmComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
