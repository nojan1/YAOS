import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeReadoutComponent } from './badge-readout.component';

describe('BadgeReadoutComponent', () => {
  let component: BadgeReadoutComponent;
  let fixture: ComponentFixture<BadgeReadoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeReadoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeReadoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
