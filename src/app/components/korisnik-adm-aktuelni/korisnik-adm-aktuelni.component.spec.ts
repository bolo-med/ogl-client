import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikAdmAktuelniComponent } from './korisnik-adm-aktuelni.component';

describe('KorisnikAdmAktuelniComponent', () => {
  let component: KorisnikAdmAktuelniComponent;
  let fixture: ComponentFixture<KorisnikAdmAktuelniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorisnikAdmAktuelniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisnikAdmAktuelniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
