import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../providers/competition.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competition-selection',
  templateUrl: './competition-selection.component.html',
  styleUrls: ['./competition-selection.component.scss']
})
export class CompetitionSelectionComponent implements OnInit {

  public useLocalServer: boolean = true;
  public serverAddress: string = "";

  constructor(private competitionService: CompetitionService, private router: Router) { }

  ngOnInit() {
  }

  public loadCompetition(){
    this.competitionService.open(1, "");
    this.router.navigateByUrl("/app");
  }
}
