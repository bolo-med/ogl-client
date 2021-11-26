import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorAdmKorisnikComponent } from './administrator-adm-korisnik.component';

describe('AdministratorAdmKorisnikComponent', () => {
  let component: AdministratorAdmKorisnikComponent;
  let fixture: ComponentFixture<AdministratorAdmKorisnikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorAdmKorisnikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorAdmKorisnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
