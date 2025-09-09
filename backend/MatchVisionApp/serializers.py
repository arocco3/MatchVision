from rest_framework import serializers
from .models import Player, Team, Match, Set, Touch, Event, User


# --- PLAYER ---
class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'


# --- TEAM ---
class TeamSerializer(serializers.ModelSerializer):
    playersList = serializers.PrimaryKeyRelatedField(
        queryset=Player.objects.all(), many=True, write_only=True
    )
    
    players = PlayerSerializer(many=True, read_only=True, source='playersList')

    class Meta:
        model = Team
        fields = ['id', 'name', 'playersList', 'players']


# --- MATCH ---
class MatchSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    team_id = serializers.PrimaryKeyRelatedField(
        queryset=Team.objects.all(),
        source='team',
        write_only=True
    )

    class Meta:
        model = Match
        fields = ['id', 'name', 'timestamp', 'team', 'team_id', 'results']


class MatchUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['result']


# --- SET ---
class SetSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, read_only=True)
    player_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Player.objects.all(),
        source='players',
        write_only=True,
        required=False
    )

    class Meta:
        model = Set
        fields = ['id', 'match', 'number', 'players', 'player_ids', 'home_score', 'guest_score']


class SetUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = ['home_score', 'guest_score']


# --- TOUCH ---
class TouchSerializer(serializers.ModelSerializer):
    set = serializers.PrimaryKeyRelatedField(
        queryset=Set.objects.all()
    )
    player = serializers.PrimaryKeyRelatedField(
        queryset=Player.objects.all()
    )


    class Meta:
        model = Touch
        fields = ['id', 'set', 'player', 'fundamental', 'outcome']


# --- EVENT ---
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


# --- USER ---
class UserSerializer(serializers.ModelSerializer):
    teams = TeamSerializer(many=True, read_only=True)
    matches = MatchSerializer(many=True, read_only=True)
    players = PlayerSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'name', 'surname', 'teams', 'matches', 'players']
