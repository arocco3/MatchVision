import { Component, OnInit, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { GlobalService } from '../../services/globalService';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        RouterModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(public globalService: GlobalService) {}

    ngOnInit(): void {
        this.globalService.loadPlayers()
        this.globalService.loadTeams()
        this.globalService.loadMatches()
    }


    sidebarOpen = signal(true);
    toggleSidebar() {
        this.sidebarOpen.update(v => !v);
    }

    handleAction(action: string) {
        console.log(`${action} clicked`);
    }
}
