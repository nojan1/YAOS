import { Component, OnInit } from '@angular/core';
import { TabbedComponent } from '../../providers/tab.service';

@Component({
  selector: 'app-runner-details',
  templateUrl: './runner-details.component.html',
  styleUrls: ['./runner-details.component.scss']
})
export class RunnerDetailsComponent implements OnInit, TabbedComponent {
  titleChange: (newTitle: string) => void;

  public runnerId: number;

  constructor() { }

  ngOnInit() {
    console.log(this.runnerId);
  }

}
