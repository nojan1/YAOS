import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandPaleteComponent } from './command-palete.component';

describe('CommandPaleteComponent', () => {
  let component: CommandPaleteComponent;
  let fixture: ComponentFixture<CommandPaleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandPaleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandPaleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
