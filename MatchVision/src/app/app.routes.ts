import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatchComponent } from './pages/match/match.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'match/:id', component: MatchComponent },
  { path: 'statistics', component: StatisticsComponent },
];
