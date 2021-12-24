import { Kategorija } from "./Kategorija";

export class Podkategorija {
    id: number;
    kategorijaID: number;
    naziv: string;
    kategorija: Kategorija = new Kategorija();
}

