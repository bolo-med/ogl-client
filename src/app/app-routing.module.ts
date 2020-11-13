import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OglasiComponent } from './components/oglasi/oglasi.component';


const routes: Routes = [
  {
    path: 'oglasi',
    component: OglasiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
