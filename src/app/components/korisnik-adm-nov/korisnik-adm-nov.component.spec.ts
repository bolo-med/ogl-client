import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikAdmNovComponent } from './korisnik-adm-nov.component';

describe('KorisnikAdmNovComponent', () => {
  let component: KorisnikAdmNovComponent;
  let fixture: ComponentFixture<KorisnikAdmNovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorisnikAdmNovComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisnikAdmNovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
