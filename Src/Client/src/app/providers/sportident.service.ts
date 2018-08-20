import { Injectable } from '@angular/core';
import { detectBaseStation, Station, StationType  } from '../../sportident/lib/station';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class SportidentService {


  constructor(private electronService: ElectronService) { 
    let test = new Station('COM4', {
      baudRate: 38400,
      type: StationType.BSM_7_8
    }, this.electronService.serialPort);

    test.readProtocolMode();
  }
}
