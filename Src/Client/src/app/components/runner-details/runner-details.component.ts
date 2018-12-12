import { Component, OnInit } from '@angular/core';
import { TabbedComponent } from '../../providers/tab.service';

@Component({
  selector: 'app-runner-details',
  templateUrl: './runner-details.component.html',
  styleUrls: ['./runner-details.component.scss']
})
export class RunnerDetailsComponent extends TabbedComponent implements OnInit {
  public runnerId: number;

  private runner: any = {};

  private clubs;

  constructor() {
    super();
   }

  ngOnInit() {
    console.log(this.runnerId);

    //this.titleChange("RUNNER X");
  }

  onClubSearch(event){
    this.clubs = [{name: "Gagnefs OK"}, {name: "Stora tuna"}].filter(x => x.name.indexOf(event.query) != -1);
  }
}
