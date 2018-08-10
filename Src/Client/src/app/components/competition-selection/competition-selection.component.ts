import { Component, OnInit } from '@angular/core';
import { ServerStateService, ServerValidationResult, LOCAL_SERVER_ADDRESS } from '../../providers/server-state.service';
import { Router } from '@angular/router';
import { WebClient } from '../../../WebClient.Generated';

@Component({
  selector: 'app-competition-selection',
  templateUrl: './competition-selection.component.html',
  styleUrls: ['./competition-selection.component.scss']
})
export class CompetitionSelectionComponent implements OnInit {

  public competitions: WebClient.CompetitionModel[] = [];

  public lastValidationResult: ServerValidationResult;
  public useLocalServer: boolean = true;
  public serverAddress: string = "";

  constructor(private serverStateService: ServerStateService, private competitionClient: WebClient.CompetitionClient, private router: Router) { }

  ngOnInit() {
    this.useLocalServerChanged();
  }

  public useLocalServerChanged() {
    if (this.useLocalServer) {
      this.lastValidationResult = null;
      this.getCompetitions(LOCAL_SERVER_ADDRESS);
    }
  }

  public submitServer() {
    this.getCompetitions(this.serverAddress);
  }

  public loadCompetition(competition: WebClient.CompetitionModel) {
    this.serverStateService.setCompetitionId(competition.id);
    this.router.navigateByUrl("/app");
  }

  private getCompetitions(serverAddress: string) {
    this.competitions = [];

    this.serverStateService.setServer(serverAddress)
      .then(result => {
        if (result == ServerValidationResult.Success) {
          this.competitionClient.get()
            .subscribe(x => {
              this.competitions = x;
            });
        }

        this.lastValidationResult = result;
      });
  }
}
