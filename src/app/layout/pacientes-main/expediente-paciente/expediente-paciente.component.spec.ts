import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientePacienteComponent } from './expediente-paciente.component';

describe('ExpedientePacienteComponent', () => {
  let component: ExpedientePacienteComponent;
  let fixture: ComponentFixture<ExpedientePacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedientePacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedientePacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
