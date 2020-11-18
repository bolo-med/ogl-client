import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorAdmComponent } from './administrator-adm.component';

describe('AdministratorAdmComponent', () => {
  let component: AdministratorAdmComponent;
  let fixture: ComponentFixture<AdministratorAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
