import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionSelectionComponent } from './competition-selection.component';

describe('CompetitionSelectionComponent', () => {
  let component: CompetitionSelectionComponent;
  let fixture: ComponentFixture<CompetitionSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
