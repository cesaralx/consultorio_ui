import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPacienteComponent } from './user-paciente.component';

describe('UserPacienteComponent', () => {
  let component: UserPacienteComponent;
  let fixture: ComponentFixture<UserPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
