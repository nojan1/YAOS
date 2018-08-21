import { Component, OnInit } from '@angular/core';
import { TabbedComponent } from '../../providers/tab.service';
import { ElectronService } from '../../providers/electron.service';

import { Station, StationType } from '../../../sportident/lib/station';
import { IBadgeDecoder } from '../../../sportident/lib/badges/decoder/iBadgeDecoder';

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

  public readouts: IBadgeDecoder[] = [];

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

    this.currentStation.protocolMode = {
      autoSendOut: 0,
      extendedProtocol : 1,
      handshake : 1,
      passwordAccess: 0,
      readSICardAfterPunch: 0
    };

    // this.currentStation.readProtocolMode()
    //   .then(v => {

    //   })
    //   .catch(x => alert("Error"));    
  }

  startBadgeReadout(){
    this.activeTestMode = TestMode.BadgeReadout;

    this.currentStation.cardReadout()
      .on("readout", (decoder: IBadgeDecoder) => {
        this.readouts.unshift(decoder);
      });
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
