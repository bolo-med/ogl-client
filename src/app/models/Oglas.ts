import { Kategorija } from "./Kategorija";
import { Korisnik } from "./Korisnik";
import { Podkategorija } from "./Podkategorija";

export class Oglas {
    id: number;
    naslov: string;
    tekst: string;
    datumObjave: string;
    datumVazenja: string;
    arhiviran: number;
    kategorijaID: number;
    podkategorijaID: number;
    korisnikID: number;
    fotografije: string;
    fotografijeNiz: string[];

    kategorija: Kategorija;
    podkategorija: Podkategorija;
    korisnik: Korisnik;
}

