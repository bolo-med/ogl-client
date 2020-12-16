import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorAdmKategorijeComponent } from './administrator-adm-kategorije.component';

describe('AdministratorAdmKategorijeComponent', () => {
  let component: AdministratorAdmKategorijeComponent;
  let fixture: ComponentFixture<AdministratorAdmKategorijeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorAdmKategorijeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorAdmKategorijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
