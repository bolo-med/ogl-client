// RESOLVER NIJE U FUNKCIJI !!!

// Ovaj fajl mora kompletno rucno da se napravi. Ne postoji komanda za njegovo kreiranje u verziji Angilar 10.
// Mora da se importuje u odgovarajuci .module.ts
// (npr: import { OglasResolver } from './components/korisnik-adm-nov/oglas.resolver'; unutar app.module.ts (providers))

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Oglas } from 'src/app/models/Oglas';
import { OglasiService } from 'src/app/services/oglasi.service';

@Injectable()
export class OglasResolver implements Resolve<Oglas> {

    oglas: Oglas;

    constructor(private oglasiServis: OglasiService, private router: Router) {
        
    };

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Oglas {
        this.oglas.id = null;
        this.oglas.naslov = '';
        this.oglas.tekst = '';
        this.oglas.datumVazenja = null;
        this.oglas.kategorijaID = -1;
        this.oglas.podkategorijaID = -1;
        this.oglas.fotografije = '';

        let idOglasa: number = +route.paramMap.get('id');

        if (idOglasa) {
            this.oglasiServis.getOglasByID(idOglasa).subscribe(data => {
                if (data.status === 0 && data.data) {
                    this.oglas = data.data;
                }
                else {
                    alert('Oglas nije pronađen!');
                    // this.router.navigateByUrl('/korisnik/svi-oglasi');
                    // return;
                }
            });
        };

        return this.oglas;
    }

}

