import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { PlayersComponent } from './pages/players/players.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { RegisterComponent } from './pages/register/register.component';
import { GameComponent } from './pages/game/game';
import { MatchesDetailsComponent } from './pages/details/matches_details/matches_details.component';
import { TeamsDetailsComponent } from './pages/details/teams_details/teams_details.component';
import { PlayersDetailsComponent } from './pages/details/players_details/players_details.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path : 'login', component: LoginComponent },
  { path : 'register', component: RegisterComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'game', component: GameComponent },
  { path: 'matches_details', component: MatchesDetailsComponent },
  { path: 'teams_details', component: TeamsDetailsComponent },
  { path: 'players_details', component: PlayersDetailsComponent },
];
