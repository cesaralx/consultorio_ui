import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesSearchComponent } from './expedientes-search.component';

describe('ExpedientesSearchComponent', () => {
  let component: ExpedientesSearchComponent;
  let fixture: ComponentFixture<ExpedientesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedientesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedientesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
