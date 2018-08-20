import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportidentDiagnosticsComponent } from './sportident-diagnostics.component';

describe('SportidentDiagnosticsComponent', () => {
  let component: SportidentDiagnosticsComponent;
  let fixture: ComponentFixture<SportidentDiagnosticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportidentDiagnosticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportidentDiagnosticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
