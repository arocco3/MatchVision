from django.http import HttpRequest, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Player, Team, Match, Set, Touch, Event
from .serializers import PlayerSerializer, TeamSerializer, MatchSerializer, SetSerializer, TouchSerializer, EventSerializer, UserSerializer

# USER
# create user
@api_view(['POST'])
def createUser(request):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    

# PLAYER CRUD
# get all players
@api_view(['GET']) 
def getPlayers(request):
    players = Player.objects.all()
    serializer = PlayerSerializer(players, many = True)
    return Response(serializer.data)

# get specific player
@api_view(['GET'])
def getPlayer(request, pk):
    player = Player.objects.get(id=pk)
    serializer = PlayerSerializer(player)
    return Response(serializer.data)

# create player
@api_view(['POST'])
def createPlayer(request):
    serializer = PlayerSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

# update player
@api_view(['PUT'])
def updatePlayer(request, pk):
    player = Player.objects.get(id = pk)
    serializer = PlayerSerializer(player, data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
# delete specific player
@api_view(['DELETE'])
def deletePlayer(request, pk):
    player = Player.objects.get(id = pk)
    player.delete()



# TEAM CRUD
# get all teams
@api_view(['GET'])
def getTeams(request):
    teams = Team.objects.all()
    serializer = TeamSerializer(teams, many = True)
    return Response(serializer.data)

# get specific team
@api_view(['GET'])
def getTeam(request, pk):
    team = Team.objects.get(id=pk)
    serializer = TeamSerializer(team)
    return Response(serializer.data)

# create team
@api_view(['POST'])
def createTeam(request):
    serializer = TeamSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
# delete specific team
@api_view(['DELETE'])
def deleteTeam(request, pk):
    team = Team.objects.get(id = pk)
    team.delete()



# MATCH CRUD
# get all matches
@api_view(['GET'])
def getMatches(request):
    matches = Match.objects.all()
    serializer = MatchSerializer(matches, many = True)
    return Response(serializer.data)

# get a specific match
@api_view(['GET'])
def getMatch(request, pk):
    match = Match.objects.get(id = pk)
    serializer = MatchSerializer(match)
    return Response(serializer.data)

# create new match
@api_view(['POST'])
def createMatch(request):
    serializer = MatchSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
# delete specific match
@api_view(['DELETE'])
def deleteMatch(request, pk):
    match = Match.objects.get(id = pk)
    match.delete()
    


# SET CRUD
# get all sets
@api_view(['GET'])
def getSets(request):
    sets = Set.objects.all()
    serializer = MatchSerializer(sets, many = True)
    return Response(serializer.data)

# create new set
@api_view(['POST'])
def createSet(request):
    serializer = SetSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
# delete specific set
@api_view(['DELETE'])
def deleteSet(request, pk):
    set = Set.objects.get(id = pk)
    set.delete()



# EVENT CRUD
# create new event
@api_view(['POST'])
def createEvent(request):
    serializer = EventSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    

# TOUCH CRUD
# get all touches
@api_view(['GET'])
def getTouches(request):
    touches = Touch.objects.all()
    serializer = TouchSerializer(touches, many = True)
    return Response(serializer.data)

# create new touch
@api_view(['POST'])
def createTouch(request):
    serializer = TouchSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)