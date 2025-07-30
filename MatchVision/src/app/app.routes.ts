import { Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatchComponent } from './pages/match/match.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

export const routes: Routes = [
  { path : 'login', component: LoginComponent },
  { path: '', component: DashboardComponent },
  { path: 'match/:id', component: MatchComponent },
  { path: 'statistics', component: StatisticsComponent },
];
