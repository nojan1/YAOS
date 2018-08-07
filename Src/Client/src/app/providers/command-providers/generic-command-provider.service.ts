import { Injectable } from '@angular/core';
import { ICommandProvider, IMatchedGenericCommand, CommandType } from './common';
import { TranslateService } from '@ngx-translate/core';
import { ServerStateService } from '../server-state.service';
import { Router } from '@angular/router';

interface CommandSpecification {
  translateKey: string,
  action: () => void
}

@Injectable({
  providedIn: 'root'
})
export class GenericCommandProviderService implements ICommandProvider {

  private knownCommands : IMatchedGenericCommand[] = [];

  constructor(translate: TranslateService, private serverStateService: ServerStateService, private router: Router) { 
    let commandSpecifications = [
      {
        translateKey: "COMMANDS.COMPETITION_CLOSE",
        action: () => { serverStateService.close(); router.navigateByUrl("/"); }
      }
    ] as CommandSpecification[];

    commandSpecifications.forEach((v,i) => {
      translate.get(v.translateKey)
        .subscribe(res => {
          this.knownCommands.push({
            title: res,
            action: v.action,
            type: CommandType.Command
          });
        });
    });
  }

  init(): void { }

  match(query: string): IMatchedGenericCommand[] {
    return this.knownCommands.filter(x => x.title.toLowerCase().indexOf(query.toLowerCase()) != -1);
  }
}
