import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajax-button',
  templateUrl: './ajax-button.component.html',
  styleUrls: ['./ajax-button.component.scss']
})
export class AjaxButtonComponent implements OnInit {
  zauzeto: boolean = null; // koristiti 'null' i 'true', za html atribut 'attr.disabled'
  @Input() funkcija: any;
  @Input() parametar: any;

  constructor() { }

  ngOnInit(): void {
  }

  // TREBALO BI DA SPRIJECI VISESTRUKO KLIKTANJE NA DUGME DOK SE CEKA NA ODGOVOR SERVERA, ALI NE SPRECAVA.
  // MOZE DA SE KLIKNE NA TEKST DUGMETA, IAKO JE DUGME 'DISABLED'. JEDINO RADI KAD JE UNUTAR DUGMETA OBICAN TEKST - BEZ 'SPAN', 'NG-CONTENT'...

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    let attr = event.currentTarget;
    console.log(attr);
    

    const rezultat: any = this.funkcija(this.parametar);
    if (rezultat instanceof Promise) {
      this.zauzeto = true;

      // 'setTimeout' dodata radi simulacije procesa prijave na udaljeni server
      setTimeout(() => {
        rezultat.then(() => {this.zauzeto = null;}, (err: any) => {this.zauzeto = null});
      }, 1000);
      // rezultat.then(() => {this.zauzeto = null;}, (err: any) => {this.zauzeto = null});
    }
  }

}
