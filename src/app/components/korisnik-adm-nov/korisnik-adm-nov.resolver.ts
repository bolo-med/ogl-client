//
// Ovaj fajl mora kompletno rucno da se napravi. Ne postoji komanda za njegovo kreiranje u verziji Angilar 10.
// Mora da se importuje u odgovarajuci .module.ts
// (npr: import { KorisnikAdmNovResolver } from './components/korisnik-adm-nov/korisnik-adm-nov.resolver'; unutar app.module.ts)
//

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { KatPodkat } from '../../models/KatPodkat';
import { KategorijeService } from './../../services/kategorije.service';
import { PotkategorijeService } from './../../services/potkategorije.service';
import { Observable } from 'rxjs';

@Injectable()
export class KorisnikAdmNovResolver implements Resolve<KatPodkat> {

    katPodkat: KatPodkat = new KatPodkat();

    constructor(private kategorijaServis: KategorijeService, private podkategorijaServis: PotkategorijeService, private router: Router) { };

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): KatPodkat {

        // 1. pokusaj
        // this.kategorijaServis.getKategorije().subscribe(data => {
        //     if (data.status === 0) {
        //         this.katPodkat.kategorije = data.data;
        //     }
        // });
        // this.podkategorijaServis.getPotkategorije().subscribe(data => this.katPodkat.podkategorije = data);
        return this.katPodkat;


        // 2. pokusaj
        // Ne moze nikako. Ponovo prvo izvrsi 'if', prije nego sto dobije odgovor od servera.
        // if (this.katPodkat)
        // if (this.katPodkat.kategorije && this.katPodkat.podkategorije) {
        //     return this.katPodkat;
        // }
        // else {
        //     this.router.navigate(['/']);
        //     alert('Greska...');
        //     return null;
        // }

        // 3. pokusaj sa posebnim servisom i forkJoin - ne radi.
        
    }

}

