import { Component, OnInit } from '@angular/core';
import { TabbedComponent } from '../../providers/tab.service';
import { ElectronService } from '../../providers/electron.service';

import { Station, StationType } from '../../../sportident/lib/station';

enum TestMode {
  BadgeDetect = 1,
  BadgeReadout = 2
}

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

  public lastBadgeNumber: string;
  public activeTestMode: TestMode;

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

    // this.currentStation.readProtocolMode()
    //   .then(v => {

    //   })
    //   .catch(x => alert("Error"));    
  }

  startBadgeDetect(){
    this.activeTestMode = TestMode.BadgeDetect;

    this.currentStation.badgeDetect()
      .on("badge", (badgeNumber: string) => {
        console.log(badgeNumber);
        this.lastBadgeNumber = badgeNumber;
      });
  }
}
