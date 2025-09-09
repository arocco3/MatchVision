import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalService } from '../../services/globalService';
import { NewMatchModalComponent } from '../matches/newMatchModal/newMatchModal.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
    RouterModule,
    NewMatchModalComponent
],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(public globalService: GlobalService) {}

  @ViewChild(NewMatchModalComponent) newMatchModal!: NewMatchModalComponent

    ngOnInit(): void {
        this.globalService.loadPlayers()
        this.globalService.loadTeams()
        this.globalService.loadMatches()
    }

    openNewMatchModal(): void {
        this.newMatchModal.open()
    }

}
