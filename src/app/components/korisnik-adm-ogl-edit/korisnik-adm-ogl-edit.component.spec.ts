import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikAdmOglEditComponent } from './korisnik-adm-ogl-edit.component';

describe('KorisnikAdmOglEditComponent', () => {
  let component: KorisnikAdmOglEditComponent;
  let fixture: ComponentFixture<KorisnikAdmOglEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorisnikAdmOglEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisnikAdmOglEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
