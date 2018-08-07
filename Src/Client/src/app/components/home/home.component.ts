import { Component, OnInit } from '@angular/core';
import { TabService } from '../../providers/tab.service';
import { ServerStateService } from '../../providers/server-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private tabService: TabService,
    private serverStateService: ServerStateService,
    private router: Router) {

  }

  ngOnInit() {
    if (!this.serverStateService.hasValidState)
      this.router.navigateByUrl("/");
  }

}
