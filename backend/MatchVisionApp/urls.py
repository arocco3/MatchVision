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
    path('matches/delete/<int:pk>/', views.deleteMatch),

    # Sets
    path('sets/', views.getSets),
    path('sets/create/', views.createSet),
    path('sets/delete/<int:pk>/', views.deleteSet),

    # Events
    # path('events/', views.getEvents),
    path('events/create/', views.createEvent),

    # Touches
    path('touches/', views.getTouches),
    path('touches/create/', views.createTouch),

    # Details
    path('player_details/<int:pk>/', views.getPlayersMatches),
    path('player_details/<int:pk>/', views.getPlayersTeams),
    path('team_details/<int:pk>/', views.getTeamMatches),
    path('team_details/<int:pk>/', views.getTeamPlayers),
    path('match_details/<int:pk>/', views.getMatchTeams),
    # path('match_details/<int:pk>/', views.getMatchStats),

]