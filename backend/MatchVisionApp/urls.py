from django.urls import path, include
from django import urls
from rest_framework.routers import DefaultRouter
from . import views

# router = DefaultRouter()
# router.register(r'players', PlayerViewSet)
# router.register(r'teams', TeamViewSet)
# router.register(r'matches', MatchViewSet)
# router.register(r'sets', SetViewSet)
# router.register(r'touches', TouchViewSet)
# router.register(r'events', EventViewSet)

# urlpatterns = [
#     path('', include(router.urls)),
# ]


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

]