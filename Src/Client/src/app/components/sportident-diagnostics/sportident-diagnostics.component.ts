import { Component, OnInit } from '@angular/core';
import { TabbedComponent } from '../../providers/tab.service';
import { ElectronService } from '../../providers/electron.service';

import { Station, StationType, detectBaseStation, BaudRate } from '../../../sportident/lib/station';
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
export class SportidentDiagnosticsComponent extends TabbedComponent {

  public connectionError: boolean;
  public ports: any[];
  public selectedPort: any;
  public currentStation: Station;

  public lastBadgeNumber: string;
  public activeTestMode: TestMode;

  public readouts: IBadgeDecoder[] = [];

  constructor(private electronService: ElectronService) {
    super();
  }

  ngOnInit() {
    this.electronService.serialPort.list()
      .then(ports => this.ports = ports);
  }

  onPortSelect() {
    if (this.currentStation) {
      //TODO: Close?
    }

    // detectBaseStation(this.selectedPort.comName, this.electronService.serialPort)
    //   .then(x => {
    //     this.currentStation = new Station(this.selectedPort.comName, x, this.electronService.serialPort);

    //     // this.currentStation.readProtocolMode()
    // //   .then(v => {

    // //   })
    // //   .catch(x => {
    // //     this.connectionError = true;
      // this.reset();
    // //   });    
    //   })
    //   .catch(x => console.error(x));

    this.currentStation = new Station(this.selectedPort.comName, {
      baudRate: BaudRate.B38400,
      type: StationType.BSM_7_8
    }, this.electronService.serialPort);

    // this.currentStation.changeSpeed(BaudRate.B38400)
    //   .then(() => {
    //     this.currentStation.readProtocolMode()
    //       .then(v => {
    //         console.log("Read protocol mode successfully");
    //       })
    //       .catch(x => {
    //         console.error(x);
    //         this.connectionError = true;

    //         // this.reset();
    //       });
    //   })
    //   .catch(x => console.error(x));

    // this.currentStation.protocolMode = {
    //   autoSendOut: 0,
    //   extendedProtocol : 1,
    //   handshake : 1,
    //   passwordAccess: 0,
    //   readSICardAfterPunch: 0
    // };

    // this.currentStation.readProtocolMode()
    //   .then(v => {
    //     console.log("Read protocol mode successfully");
    //   })
    //   .catch(x => {
    //     console.error(x);
    //     this.connectionError = true;
          // this.reset();
    //   });    
  }

  startBadgeReadout() {
    this.activeTestMode = TestMode.BadgeReadout;

    this.currentStation.cardReadout()
      .on("readout", (decoder: IBadgeDecoder) => {
        this.readouts.unshift(decoder);
      });
  }

  startBadgeDetect() {
    this.activeTestMode = TestMode.BadgeDetect;

    this.currentStation.badgeDetect()
      .on("badge", (badgeNumber: string) => {
        console.log(badgeNumber);
        this.lastBadgeNumber = badgeNumber;
      });
  }

  stopTestMode(){
    this.activeTestMode = null;
  }

  private reset() {
    this.selectedPort = null;

    this.currentStation.destroy();
    this.currentStation = null;
  }
}
