import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorAdmMeniComponent } from './administrator-adm-meni.component';

describe('AdministratorAdmMeniComponent', () => {
  let component: AdministratorAdmMeniComponent;
  let fixture: ComponentFixture<AdministratorAdmMeniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorAdmMeniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorAdmMeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
