import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

import { HeaderComponent } from './pages/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { LoginComponent } from './pages/login/login.component';
import { PlayersComponent } from './pages/players/players.component';
import { FooterComponent } from './pages/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';
import { GameComponent} from './pages/game/game';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    LoginComponent,
    DashboardComponent,
    MatchesComponent,
    StatisticsComponent,
    PlayersComponent,
    FooterComponent,
    HeaderComponent,
    RegisterComponent,
    GameComponent,
],
  templateUrl: './app.html',
  styleUrls: ['./app.scss', './pages/login/login.component.scss', './pages/dashboard/dashboard.component.scss']
})
export class App {
  protected readonly title = signal('MatchVision');
}
