import { Component, OnInit } from '@angular/core';
import { TabbedComponent } from '../../providers/tab.service';
import { SportidentService } from '../../providers/sportident.service';

@Component({
  selector: 'app-direct-entry',
  templateUrl: './direct-entry.component.html',
  styleUrls: ['./direct-entry.component.scss']
})
export class DirectEntryComponent extends TabbedComponent implements OnInit {
  constructor(private sportidentService: SportidentService) { 
    super();
  }

  ngOnInit() {
  }

}
