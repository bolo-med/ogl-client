import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorAdmKorisniciComponent } from './administrator-adm-korisnici.component';

describe('AdministratorAdmKorisniciComponent', () => {
  let component: AdministratorAdmKorisniciComponent;
  let fixture: ComponentFixture<AdministratorAdmKorisniciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorAdmKorisniciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorAdmKorisniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
