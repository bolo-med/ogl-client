import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorAdmPodkategorijeComponent } from './administrator-adm-podkategorije.component';

describe('AdministratorAdmPodkategorijeComponent', () => {
  let component: AdministratorAdmPodkategorijeComponent;
  let fixture: ComponentFixture<AdministratorAdmPodkategorijeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorAdmPodkategorijeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorAdmPodkategorijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
