import { Component, OnInit } from '@angular/core';
import { TabbedComponent } from '../../providers/tab.service';

@Component({
  selector: 'app-runner-details',
  templateUrl: './runner-details.component.html',
  styleUrls: ['./runner-details.component.scss']
})
export class RunnerDetailsComponent extends TabbedComponent implements OnInit {
  public runnerId: number;

  constructor() {
    super();
   }

  ngOnInit() {
    console.log(this.runnerId);
  }

}
