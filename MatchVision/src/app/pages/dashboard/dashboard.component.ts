import { Component, OnInit, ViewChild } from '@angular/core'
import { RouterModule } from '@angular/router'
import { GlobalService } from '../../services/globalService'
import { NewMatchModalComponent } from '../matches/newMatchModal/newMatchModal.component'
import { NewTeamModalComponent } from '../teams/newTeamModal/newTeamModal.component'
import { NewPlayerModalComponent } from '../players/newPlayerModal/newPlayerModal.component'

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        RouterModule,
        NewMatchModalComponent,
        NewTeamModalComponent,
        NewPlayerModalComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(public globalService: GlobalService) {}

  @ViewChild(NewMatchModalComponent) newMatchModal!: NewMatchModalComponent
  @ViewChild(NewTeamModalComponent) newTeamModal!: NewTeamModalComponent
  @ViewChild(NewPlayerModalComponent) newPlayerModal!: NewPlayerModalComponent

    ngOnInit(): void {
        this.globalService.loadPlayers()
        this.globalService.loadTeams()
        this.globalService.loadMatches()
    }

    openNewMatchModal(): void {
        this.newMatchModal.open()
    }

    openNewTeamModal(): void {
        this.newTeamModal.open()
    }

    openNewPlayerModal(): void {
        this.newPlayerModal.open()
    }

}
