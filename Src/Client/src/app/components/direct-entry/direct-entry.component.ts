import { Component, OnInit } from '@angular/core';
import { TabbedComponent } from '../../providers/tab.service';

@Component({
  selector: 'app-direct-entry',
  templateUrl: './direct-entry.component.html',
  styleUrls: ['./direct-entry.component.scss']
})
export class DirectEntryComponent implements OnInit, TabbedComponent {
  titleChange: (newTitle: string) => void;

  constructor() { }

  ngOnInit() {
  }

}
