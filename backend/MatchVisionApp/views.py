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



#     elif request.method == 'PUT':
#         player_data = JSONParser().parse(request)
#         player = Player.objects.get(playerID = player_data['id'])
#         players_serializer = PlayerSerializer(player, data = player_data)
#         if players_serializer.is_valid():
#             players_serializer.save()
#             return JsonResponse("Update successfully", safe = False)
#         return JsonResponse("Failed to update")
    
#     elif request.method == "DELETE":
#         Player.objects.get(playerID = player_data['id']).delete()
#         return JsonResponse("Deleted successfully", safe = False)
    


# from django.shortcuts import render
# from .models import Player

# # def get_all_players(request):
# #     players = Player.objects.all()
# #     return render(request, 'players.component.html', {'players': players})



# @csrf_exempt
# def teamAPI(request, id=None):
#     if request.method == 'GET':
#         if id:
#             try:
#                 team = Team.objects.get(id=id)
#                 serializer = TeamSerializer(team)
#                 return JsonResponse(serializer.data, safe=False)
#             except ObjectDoesNotExist:
#                 return JsonResponse({"error": "Squadra non trovata"}, status=404)
#         else:
#             teams = Team.objects.all()
#             serializer = TeamSerializer(teams, many=True)
#             return JsonResponse(serializer.data, safe=False)
    
#     elif request.method == 'POST':
#         team_data = JSONParser().parse(request)
#         serializer = TeamSerializer(data=team_data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Added successfully", safe=False)
#         return JsonResponse("Failed to add", safe=False)
    
#     elif request.method == 'PUT':
#         team_data = JSONParser().parse(request)
#         try:
#             team = Team.objects.get(id=team_data['id'])
#         except ObjectDoesNotExist:
#             return JsonResponse({"error": "Squadra non trovata"}, status=404)
#         serializer = TeamSerializer(team, data=team_data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Update successfully", safe=False)
#         return JsonResponse("Failed to update", safe=False)
    
#     elif request.method == "DELETE":
#         try:
#             team = Team.objects.get(id=id)
#         except ObjectDoesNotExist:
#             return JsonResponse({"error": "Squadra non trovata"}, status=404)
#         team.delete()
#         return JsonResponse("Deleted successfully", safe=False)



# @csrf_exempt
# def matchAPI(request, id=None):
#     if request.method == 'GET':
#         if id:
#             try:
#                 match = Match.objects.get(id=id)
#                 serializer = MatchSerializer(match)
#                 return JsonResponse(serializer.data, safe=False)
#             except ObjectDoesNotExist:
#                 return JsonResponse({"error": "Partita non trovata"}, status=404)
#         else:
#             matches = Match.objects.all()
#             serializer = MatchSerializer(matches, many=True)
#             return JsonResponse(serializer.data, safe=False)
    
#     elif request.method == 'POST':
#         match_data = JSONParser().parse(request)
#         serializer = MatchSerializer(data=match_data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Added successfully", safe=False)
#         return JsonResponse("Failed to add", safe=False)
    
#     elif request.method == 'PUT':
#         match_data = JSONParser().parse(request)
#         try:
#             match = Match.objects.get(id=match_data['id'])
#         except ObjectDoesNotExist:
#             return JsonResponse({"error": "Partita non trovata"}, status=404)
#         serializer = MatchSerializer(match, data=match_data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Update successfully", safe=False)
#         return JsonResponse("Failed to update", safe=False)
    
#     elif request.method == "DELETE":
#         try:
#             match = Match.objects.get(id=id)
#         except ObjectDoesNotExist:
#             return JsonResponse({"error": "Partita non trovata"}, status=404)
#         match.delete()
#         return JsonResponse("Deleted successfully", safe=False)



# @csrf_exempt
# def setAPI(request, id=None):
#     if request.method == 'GET':
#         if id:
#             try:
#                 set_obj = Set.objects.get(id=id)
#                 serializer = SetSerializer(set_obj)
#                 return JsonResponse(serializer.data, safe=False)
#             except ObjectDoesNotExist:
#                 return JsonResponse({"error": "Set non trovato"}, status=404)
#         else:
#             sets = Set.objects.all()
#             serializer = SetSerializer(sets, many=True)
#             return JsonResponse(serializer.data, safe=False)
    
#     elif request.method == 'POST':
#         set_data = JSONParser().parse(request)
#         serializer = SetSerializer(data=set_data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Added successfully", safe=False)
#         return JsonResponse("Failed to add", safe=False)
    
#     elif request.method == 'PUT':
#         set_data = JSONParser().parse(request)
#         try:
#             set_obj = Set.objects.get(id=set_data['id'])
#         except ObjectDoesNotExist:
#             return JsonResponse({"error": "Set non trovato"}, status=404)
#         serializer = SetSerializer(set_obj, data=set_data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Update successfully", safe=False)
#         return JsonResponse("Failed to update", safe=False)
    
#     elif request.method == "DELETE":
#         try:
#             set_obj = Set.objects.get(id=id)
#         except ObjectDoesNotExist:
#             return JsonResponse({"error": "Set non trovato"}, status=404)
#         set_obj.delete()
#         return JsonResponse("Deleted successfully", safe=False)



# @csrf_exempt
# def touchAPI(request, id=None):
#     if request.method == 'GET':
#         if id:
#             try:
#                 touch = Touch.objects.get(id=id)
#                 serializer = TouchSerializer(touch)
#                 return JsonResponse(serializer.data, safe=False)
#             except ObjectDoesNotExist:
#                 return JsonResponse({"error": "Tocco non trovato"}, status=404)
#         else:
#             touches = Touch.objects.all()
#             serializer = TouchSerializer(touches, many=True)
#             return JsonResponse(serializer.data, safe=False)
    
#     elif request.method == 'POST':
#         touch_data = JSONParser().parse(request)
#         serializer = TouchSerializer(data=touch_data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Added successfully", safe=False)
#         return JsonResponse("Failed to add", safe=False)
    
#     elif request.method == 'PUT':
#         touch_data = JSONParser().parse(request)
#         try:
#             touch = Touch.objects.get(id=touch_data['id'])
#         except ObjectDoesNotExist:
#             return JsonResponse({"error": "Tocco non trovato"}, status=404)
#         serializer = TouchSerializer(touch, data=touch_data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Update successfully", safe=False)
#         return JsonResponse("Failed to update", safe=False)
    
#     elif request.method == "DELETE":
#         try:
#             touch = Touch.objects.get(id=id)
#         except ObjectDoesNotExist:
#             return JsonResponse({"error": "Tocco non trovato"}, status=404)
#         touch.delete()
#         return JsonResponse("Deleted successfully", safe=False)



# @csrf_exempt
# def eventAPI(request, id=None):
#     if request.method == 'GET':
#         if id:
#             try:
#                 event = Event.objects.get(id=id)
#                 serializer = EventSerializer(event)
#                 return JsonResponse(serializer.data, safe=False)
#             except ObjectDoesNotExist:
#                 return JsonResponse({"error": "Evento non trovato"}, status=404)
#         else:
#             events = Event.objects.all()
#             serializer = EventSerializer(events, many=True)
#             return JsonResponse(serializer.data, safe=False)
    
#     elif request.method == 'POST':
#         event_data = JSONParser().parse(request)
#         serializer = EventSerializer(data=event_data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Added successfully", safe=False)
#         return JsonResponse("Failed to add", safe=False)
    
#     elif request.method == 'PUT':
#         event_data = JSONParser().parse(request)
#         try:
#             event = Event.objects.get(id=event_data['id'])
#         except ObjectDoesNotExist:
#             return JsonResponse({"error": "Evento non trovato"}, status=404)
#         serializer = EventSerializer(event, data=event_data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Update successfully", safe=False)
#         return JsonResponse("Failed to update", safe=False)
    
#     elif request.method == "DELETE":
#         try:
#             event = Event.objects.get(id=id)
#         except ObjectDoesNotExist:
#             return JsonResponse({"error": "Evento non trovato"}, status=404)
#         event.delete()
#         return JsonResponse("Deleted successfully", safe=False)