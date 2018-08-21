import { Component, OnInit } from '@angular/core';
import { TabbedComponent } from '../../providers/tab.service';

@Component({
  selector: 'app-badge-readout',
  templateUrl: './badge-readout.component.html',
  styleUrls: ['./badge-readout.component.scss']
})
export class BadgeReadoutComponent extends TabbedComponent implements OnInit {
  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
