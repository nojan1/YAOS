import { Component, OnInit } from '@angular/core';
import { TabbedComponent } from '../../providers/tab.service';
import { EditingComponentBase } from '../editing-component-base';
import { WebClient } from '../../../WebClient.Generated';
import { ServerStateService } from '../../providers/server-state.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent extends EditingComponentBase<WebClient.IClassWithPropertiesModel> implements OnInit {
  constructor(private classClient: WebClient.ClassClient, private serverStateService: ServerStateService) {
    super();
  }

  ngOnInit() {
    this.classClient.get(this.serverStateService.competitionId)
      .subscribe(x => this.items = x);
  }

  protected emptyItemFactory(): WebClient.IClassWithPropertiesModel {
    return {
      id: 0,
      allowBadgeStart: true,
      name: "",
      hasStartTime: false,
      timeSpacing: 2,
      vacancyPercentage: 20
    };
  }
}
