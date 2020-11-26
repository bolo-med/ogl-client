import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikAdmArhivaComponent } from './korisnik-adm-arhiva.component';

describe('KorisnikAdmArhivaComponent', () => {
  let component: KorisnikAdmArhivaComponent;
  let fixture: ComponentFixture<KorisnikAdmArhivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorisnikAdmArhivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisnikAdmArhivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
