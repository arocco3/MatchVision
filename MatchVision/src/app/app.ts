import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatchComponent } from './pages/match/match.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('MatchVision');
}
