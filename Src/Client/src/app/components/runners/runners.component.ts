import { Component, OnInit } from '@angular/core';
import { TabbedComponent, TabService } from '../../providers/tab.service';
import { WebClient } from '../../../WebClient.Generated';
import { RunnerDetailsComponent } from '../runner-details/runner-details.component';

@Component({
  selector: 'app-runners',
  templateUrl: './runners.component.html',
  styleUrls: ['./runners.component.scss']
})
export class RunnersComponent implements OnInit, TabbedComponent {
  titleChange: (newTitle: string) => void;

  runners: WebClient.IRunnerModel[];

  constructor(private tabService: TabService) { }

  ngOnInit() {
    this.runners = [
      {
        id: 1,
        name: "Niklas Hedlund",
        club: "Gagnefs OK",
        class: new WebClient.ClassModel({
          id: 1,
          name: "Mellansvår 5.0"
        })
      },
      {
        id: 2,
        name: "Niklas2 Hedlund",
        club: "Gagnefs OK",
        class: new WebClient.ClassModel({
          id: 1,
          name: "Mellansvår 5.0"
        })
      },
      {
        id: 3,
        name: "Niklas3 Hedlund",
        club: "Gagnefs OK",
        class: new WebClient.ClassModel({
          id: 1,
          name: "Mellansvår 5.0"
        })
      }
    ];
  }

  public openRunner(runner: WebClient.IRunnerModel){
    this.tabService.openTab(RunnerDetailsComponent, {
      runnerId: runner.id
    });
  }

}
