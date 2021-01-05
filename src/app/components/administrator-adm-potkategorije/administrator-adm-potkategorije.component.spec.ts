import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorAdmPotkategorijeComponent } from './administrator-adm-potkategorije.component';

describe('AdministratorAdmPotkategorijeComponent', () => {
  let component: AdministratorAdmPotkategorijeComponent;
  let fixture: ComponentFixture<AdministratorAdmPotkategorijeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorAdmPotkategorijeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorAdmPotkategorijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
