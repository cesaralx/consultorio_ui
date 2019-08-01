import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitaMedicaComponent } from './visita-medica.component';

describe('VisitaMedicaComponent', () => {
  let component: VisitaMedicaComponent;
  let fixture: ComponentFixture<VisitaMedicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitaMedicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
