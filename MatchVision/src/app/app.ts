import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatchComponent } from './pages/match/match.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { LoginComponent } from "./pages/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, DashboardComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss', './pages/login/login.component.scss', './pages/dashboard/dashboard.component.scss']
})
export class App {
  protected readonly title = signal('MatchVision');
}
