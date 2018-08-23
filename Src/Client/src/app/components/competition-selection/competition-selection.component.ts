import { Component, OnInit } from '@angular/core';
import { ServerStateService, ServerValidationResult, LOCAL_SERVER_ADDRESS } from '../../providers/server-state.service';
import { Router } from '@angular/router';
import { WebClient } from '../../../WebClient.Generated';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-competition-selection',
  templateUrl: './competition-selection.component.html',
  styleUrls: ['./competition-selection.component.scss']
})
export class CompetitionSelectionComponent implements OnInit {
  public competitions: WebClient.ICompetitionModel[] = [];
  
  public useLocalServer: boolean = true;
  public serverAddress: string = "";

  public displayNewCompetitionDialog: boolean;
  public newCompetition: WebClient.ICompetitionModel;

  constructor(private serverStateService: ServerStateService,
    private competitionClient: WebClient.CompetitionClient,
    private router: Router,
    private messageService: MessageService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.useLocalServerChanged();
  }

  public useLocalServerChanged() {
    if (this.useLocalServer) {
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

        this.handleValidationResult(result);
      });
  }

  handleValidationResult(result: ServerValidationResult): any {
    let translateKey = [
      "TABS.COMPETITION_SELECTION.VALIDATION_FAIL",
      "TABS.COMPETITION_SELECTION.VALIDATION_WRONGVERSION",
      "TABS.COMPETITION_SELECTION.VALIDATION_SUCCESS"
    ][result - 1];

    this.translate.get(translateKey)
      .subscribe(text => this.messageService.add({
        severity: result == ServerValidationResult.Success ? "success" : "error",
        summary: text,
        sticky: true
      }));
  }
}
