import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesMainComponent } from './pacientes-main.component';

describe('PacientesMainComponent', () => {
  let component: PacientesMainComponent;
  let fixture: ComponentFixture<PacientesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
