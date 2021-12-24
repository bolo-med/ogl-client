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

    kategorija: Kategorija = new Kategorija();
    podkategorija: Podkategorija = new Podkategorija();
    korisnik: Korisnik = new Korisnik();
}

