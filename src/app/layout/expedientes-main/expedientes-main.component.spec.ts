import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesMainComponent } from './expedientes-main.component';

describe('ExpedientesMainComponent', () => {
  let component: ExpedientesMainComponent;
  let fixture: ComponentFixture<ExpedientesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedientesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedientesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
