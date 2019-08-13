import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitaMedicaPacienteComponent } from './visita-medica-paciente.component';

describe('VisitaMedicaPacienteComponent', () => {
  let component: VisitaMedicaPacienteComponent;
  let fixture: ComponentFixture<VisitaMedicaPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitaMedicaPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitaMedicaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
