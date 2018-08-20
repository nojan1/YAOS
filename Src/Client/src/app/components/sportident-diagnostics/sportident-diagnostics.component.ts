import { Component, OnInit } from '@angular/core';
import { TabbedComponent } from '../../providers/tab.service';
import { ElectronService } from '../../providers/electron.service';

import { Station, StationType } from '../../../sportident/lib/station';

@Component({
  selector: 'app-sportident-diagnostics',
  templateUrl: './sportident-diagnostics.component.html',
  styleUrls: ['./sportident-diagnostics.component.scss']
})
export class SportidentDiagnosticsComponent implements TabbedComponent {
  titleChange: (newTitle: string) => void;

  public ports: any[];
  public selectedPort: any;
  public currentStation: Station;

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
    this.electronService.serialPort.list()
      .then(ports => this.ports = ports);
  }

  onPortSelect(){
    if(this.currentStation){
      //TODO: Close?
    }

    this.currentStation = new Station(this.selectedPort.comName, {
      baudRate: 38400,
      type: StationType.BSM_7_8
    }, this.electronService.serialPort);

    this.currentStation.readProtocolMode()
      .then(v => {
        
      })
      .catch(x => alert("Error"));    
  }
}
