import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectEntryComponent } from './direct-entry.component';

describe('DirectEntryComponent', () => {
  let component: DirectEntryComponent;
  let fixture: ComponentFixture<DirectEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
