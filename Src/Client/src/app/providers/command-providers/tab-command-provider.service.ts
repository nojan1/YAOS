import { Injectable, Type } from '@angular/core';
import { TabbedComponent } from '../tab.service';
import { CheckpointsComponent } from '../../components/checkpoints/checkpoints.component';
import { TranslateService } from '../../../../node_modules/@ngx-translate/core';
import { IMatchedTabCommand, ICommandProvider, CommandType } from './common';

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
