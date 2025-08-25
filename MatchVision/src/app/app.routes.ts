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
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'game', component: GameComponent },

  // Players
  { path: 'players', component: PlayersComponent },
  // { path: 'players/create', views.createPlayer },
  // { path: 'players/update/:id', views.updatePlayer },
  // { path: 'players/delete/:id', views.deletePlayer },

  // Teams
  { path: 'teams', component: TeamsComponent },
  // { path: 'teams/create', views.createTeam },
  // { path: 'teams/delete/:id', views.deleteTeam },

  // Matches
  { path: 'matches', component: MatchesComponent },
  // { path: 'matches/create', views.createMatch },
  // { path: 'matches/delete/:id', views.deleteMatch },

  // Sets
  // { path: 'sets', views.getSets },
  // { path: 'sets/create', views.createSet },
  // { path: 'sets/delete/:id', views.deleteSet },

  // Events
  // { path: 'events', views.getEvents },
  // { path: 'events/create', views.createEvent },

  // Touches
  // { path: 'touches', views.getTouches },
  // { path: 'touches/create', views.createTouch },

  // Details
  //    Players
  { path: 'players_details/:id', component: PlayersDetailsComponent},
  //    Matches
  { path: 'matches_details/:id', component: MatchesDetailsComponent},
  //    Teams
  { path: 'teams_details/:id', component: TeamsDetailsComponent},
];
