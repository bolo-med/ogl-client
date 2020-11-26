import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikAdmSviComponent } from './korisnik-adm-svi.component';

describe('KorisnikAdmSviComponent', () => {
  let component: KorisnikAdmSviComponent;
  let fixture: ComponentFixture<KorisnikAdmSviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorisnikAdmSviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisnikAdmSviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
