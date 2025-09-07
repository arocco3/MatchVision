from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

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
    try:
        player = Player.objects.get(id = pk)
        player.delete()
        return Response({"message": "Player deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Player.DoesNotExist:
        return Response({"error": "Player not found"}, status=status.HTTP_404_NOT_FOUND)


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
    return Response(serializer.errors, status=400)

# delete specific team
@api_view(['DELETE'])
def deleteTeam(request, pk):
    try:
        team = Team.objects.get(id = pk)
        team.delete()
        return Response({"message": "Team deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Team.DoesNotExist:
        return Response({"error": "Team not found"}, status=status.HTTP_404_NOT_FOUND)



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
    try:
        match = Match.objects.get(id = pk)
        match.delete()
        return Response({"message": "Match deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Match.DoesNotExist:
        return Response({"error": "Match not found"}, status=status.HTTP_404_NOT_FOUND)
    


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
    try:
        set = Set.objects.get(id = pk)
        set.delete()
        return Response({"message": "Set deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Set.DoesNotExist:
        return Response({"error": "Set not found"}, status=status.HTTP_404_NOT_FOUND)



# EVENT CRUD
# create new event
@api_view(['POST'])
def createEvent(request):
    serializer = EventSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
# delete specific event
    



# TOUCH CRUD
# get all touches
# @api_view(['GET'])
# def getTouches(request):
#     touches = Touch.objects.all()
#     serializer = TouchSerializer(touches, many = True)
#     return Response(serializer.data)

# create new touch
@api_view(['POST'])
def createTouch(request):
    serializer = TouchSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# get touches by player and match
@api_view(['GET'])
def getTouchesByPlayerMatch(request, player_id, match_id):
    touches = Touch.objects.filter(player_id=player_id, match_id=match_id)
    serializer = TouchSerializer(touches, many=True)
    return Response(serializer.data)
    
# get touches by player and match and set
@api_view(['GET'])
def getTouchesByPlayerMatchSet(request, player_id, match_id, set_id):
    touches = Touch.objects.filter(player_id=player_id, match_id=match_id, set_id=set_id)
    serializer = TouchSerializer(touches, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteTouch(request, pk):
    try:
        touch = Touch.objects.get(id=pk)
        touch.delete()
        return Response({"message": "Touch deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Touch.DoesNotExist:
        return Response({"error": "Touch not found"}, status=status.HTTP_404_NOT_FOUND)



# Details
# teams with player
@api_view(['GET'])
def getPlayersTeams(request, pk):
    player = Player.objects.get(pk = pk)
    teams_direct = Team.objects.filter(playersList=player)
    teams_non_direct = Team.objects.filter(matches__sets__players=player)
    teams = (teams_direct | teams_non_direct).distinct()
    return Response(TeamSerializer(teams, many=True).data)

# matches with player
@api_view(['GET'])
def getPlayersMatches(request, pk):
    player = Player.objects.get(pk=pk)
    matches = Match.objects.filter(sets__players=player).distinct()
    return Response(MatchSerializer(matches, many=True).data)

# team of the match
@api_view(['GET'])
def getMatchTeams(request, pk):
    match = Match.objects.get(pk=pk)
    teams = match.teams.all()
    return Response(TeamSerializer(teams, many=True).data)

# sets of the match
@api_view(['GET'])
def getMatchSets(request, pk):
    match = Match.objects.get(pk=pk)
    sets = Set.objects.filter(match=match).order_by("number")
    return Response(SetSerializer(sets, many=True).data)

# players of the team
@api_view(['GET'])
def getTeamPlayers(request, pk):
    team = Team.objects.get(pk=pk)
    players = Player.objects.filter(sets__match__teams=team).distinct()
    return Response(PlayerSerializer(players, many=True).data)

# matches of a team
@api_view(['GET'])
def getTeamMatches(request, pk):
    team = Team.objects.get(pk=pk)
    matches = Match.objects.filter(sets__players__sets__match__teams=team).distinct()    
    return Response(MatchSerializer(matches, many=True).data)
