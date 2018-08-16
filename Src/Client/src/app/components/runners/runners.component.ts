import { Component, OnInit } from '@angular/core';
import { TabbedComponent } from '../../providers/tab.service';

@Component({
  selector: 'app-runners',
  templateUrl: './runners.component.html',
  styleUrls: ['./runners.component.scss']
})
export class RunnersComponent implements OnInit, TabbedComponent {
  titleChange: (newTitle: string) => void;

  constructor() { }

  ngOnInit() {
  }

}
