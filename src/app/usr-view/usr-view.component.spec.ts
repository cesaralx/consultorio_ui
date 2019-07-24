import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrViewComponent } from './usr-view.component';

describe('UsrViewComponent', () => {
  let component: UsrViewComponent;
  let fixture: ComponentFixture<UsrViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsrViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsrViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
