import { Injectable, Type } from '@angular/core';
import { TabbedComponent } from '../tab.service';
import { CheckpointsComponent } from '../../components/checkpoints/checkpoints.component';
import { TranslateService } from '@ngx-translate/core';
import { IMatchedTabCommand, ICommandProvider, CommandType } from './common';
import { ClassesComponent } from '../../components/classes/classes.component';
import { MapsComponent } from '../../components/maps/maps.component';
import { RunnersComponent } from '../../components/runners/runners.component';
import { RunnerDetailsComponent } from '../../components/runner-details/runner-details.component';
import { BadgeReadoutComponent } from '../../components/badge-readout/badge-readout.component';
import { DirectEntryComponent } from '../../components/direct-entry/direct-entry.component';
import { SportidentDiagnosticsComponent } from '../../components/sportident-diagnostics/sportident-diagnostics.component';

interface TabSpecification {
  translateKey: string,
  componentType: Type<TabbedComponent>
}

@Injectable({
  providedIn: 'root'
})
export class TabCommandProviderService implements ICommandProvider {

  private knownTabs: IMatchedTabCommand[] = [];

  constructor(translate: TranslateService) { 
    let tabbedSpecifications = [
      {
        translateKey: 'COMMANDS.CHECKPOINTS_ADMIN',
        componentType: CheckpointsComponent
      },
      {
        translateKey: 'COMMANDS.MAPS_ADMIN',
        componentType: MapsComponent
      },
      {
        translateKey: 'COMMANDS.CLASSES_ADMIN',
        componentType: ClassesComponent
      },
      {
        translateKey: 'COMMANDS.RUNNERS',
        componentType: RunnersComponent
      },
      {
        translateKey: 'COMMANDS.ADD_RUNNER',
        componentType: RunnerDetailsComponent
      },
      {
        translateKey: 'COMMANDS.BADGE_READOUT',
        componentType: BadgeReadoutComponent
      },
      {
        translateKey: 'COMMANDS.DIRECT_ENTRY',
        componentType: DirectEntryComponent
      },
      {
        translateKey: 'COMMANDS.SPORTIDENT_DIAG',
        componentType: SportidentDiagnosticsComponent
      }
    ] as TabSpecification[];

    tabbedSpecifications.forEach((v,i) => {
      translate.get(v.translateKey)
        .subscribe(res => {
          this.knownTabs.push({
            title: res,
            componentType: v.componentType,
            type: CommandType.Tab
          });
        });
    });
  }

  init(): void {

  }

   match(query: string): IMatchedTabCommand[] {
    return this.knownTabs.filter(x => x.title.toLowerCase().indexOf(query.toLowerCase()) != -1);
  }

}
