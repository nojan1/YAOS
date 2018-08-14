import { Component, OnInit } from '@angular/core';
import { TabbedComponent } from '../../providers/tab.service';
import { EditingComponentBase } from '../editing-component-base';
import { WebClient } from '../../../WebClient.Generated';
import { ServerStateService } from '../../providers/server-state.service';

@Component({
  selector: 'app-checkpoints',
  templateUrl: './checkpoints.component.html',
  styleUrls: ['./checkpoints.component.scss']
})
export class CheckpointsComponent extends EditingComponentBase<WebClient.ICheckpointModel> implements OnInit, TabbedComponent {
  titleChange: (newTitle: string) => void;
  
  constructor(private checkpointClient: WebClient.CheckpointClient, private serverStateService: ServerStateService) { 
    super();
  }

  ngOnInit() {
    this.checkpointClient.get(this.serverStateService.competitionId)
      .subscribe(x => this.items = x);
  }

  protected emptyItemFactory(): WebClient.ICheckpointModel{
    return {
      id: 0,
      code : 0
    };
  }

}
