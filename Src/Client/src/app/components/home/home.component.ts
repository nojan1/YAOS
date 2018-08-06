import { Component, OnInit } from '@angular/core';
import { TabService } from '../../providers/tab.service';
import { CompetitionService } from '../../providers/competition.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private tabService: TabService,
    private competitionService: CompetitionService,
    private router: Router) {

  }

  ngOnInit() {
    if (!this.competitionService.hasValidState)
      this.router.navigateByUrl("/");
  }

}
