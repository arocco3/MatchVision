from django.urls import path
from . import views

urlpatterns = [
    # Players
    path('players/', views.getPlayers),
    path('players/<int:pk>/', views.getPlayer),
    path('players/create/', views.createPlayer),
    path('players/update/<int:pk>/', views.updatePlayer),
    path('players/delete/<int:pk>/', views.deletePlayer),

    # Teams
    path('teams/', views.getTeams),
    path('teams/<int:pk>/', views.getTeam),
    path('teams/create/', views.createTeam),
    path('teams/delete/<int:pk>/', views.deleteTeam),

    # Matches
    path('matches/', views.getMatches),
    path('matches/<int:pk>/', views.getMatch),
    path('matches/create/', views.createMatch),
    path('matches/update/<int:pk>/', views.updateMatch),
    path('matches/delete/<int:pk>/', views.deleteMatch),

    # Sets
    path('sets/', views.getSets),
    path('sets/create/', views.createSet),
    path('sets/update/<int:pk>/', views.updateSet),
    path('sets/delete/<int:pk>/', views.deleteSet),

    # Events
    # path('events/', views.getEvents),
    path('events/create/', views.createEvent),

    # Touches
    path('touches/player/<int:player_id>/match/<int:match_id>/', views.getTouchesByPlayerMatch),
    path('touches/player/<int:player_id>/match/<int:match_id>/set/<int:set_id>/', views.getTouchesByPlayerMatch),
    path('touches/create/', views.createTouch),
    path('touches/delete/<int:pk>/', views.deleteTouch),

    # Details
    path('player_details/<int:pk>/matches/', views.getPlayersMatches),
    path('player_details/<int:pk>/teams/', views.getPlayersTeams),
    path('team_details/<int:pk>/matches/', views.getTeamMatches),
    path('team_details/<int:pk>/players/', views.getTeamPlayers),
    path('match_details/<int:pk>/team/', views.getMatchTeam),
    path('match_details/<int:pk>/sets/', views.getMatchSets),
    path('match_details/<int:pk>/stats/', views.getMatchStats),
    path('match_details/sets/<int:pk>/stats/', views.getSetsStats),
]