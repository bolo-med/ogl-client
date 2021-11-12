import { FormControl } from '@angular/forms';

export class StavkaOdaberite {
    static nijeOdabrao (kontrola: FormControl): {[kljuc: string]: boolean} {
        if (kontrola.value === -1) {
            return {'nijeOdabrao': true}
        }
        return null;
    }
}