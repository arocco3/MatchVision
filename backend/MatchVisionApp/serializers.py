# from rest_framework import serializers
# from MatchVisionApp.models import Player, Match, Event, Set, Team, Touch, User

# class UserSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = User
#         fields = '__all__'

# class PlayerSerializer(serializers.ModelSerializer):
#     role_display = serializers.CharField(source="get_role_display", read_only=True)

#     class Meta:
#         model = Player
#         fields = '__all__'


# class TeamSerializer(serializers.ModelSerializer):
#     playersList = serializers.PrimaryKeyRelatedField(
#         queryset=Player.objects.all(), many=True, write_only=True
#     )
#     players = PlayerSerializer(many=True, read_only=True, source='playersList')

#     class Meta:
#         model = Team
#         fields = ['id', 'name', 'playersList', 'players']


# class EventSerializer(serializers.ModelSerializer):
#     event_type_display = serializers.CharField(source="get_event_type_display", read_only=True)

#     class Meta:
#         model = Event
#         fields = '__all__'


# class TouchSerializer(serializers.ModelSerializer):
#     player = PlayerSerializer(read_only=True)
#     fundamental_display = serializers.CharField(source="get_fundamental_display", read_only=True)
#     outcome_display = serializers.CharField(source="get_outcome_display", read_only=True)

#     class Meta:
#         model = Touch
#         fields = '__all__'


# class SetSerializer(serializers.ModelSerializer):
#     touches = TouchSerializer(many=True, read_only=True)

#     class Meta:
#         model = Set
#         fields = '__all__'


# class MatchSerializer(serializers.ModelSerializer):
#     team = serializers.PrimaryKeyRelatedField(
#         queryset=Team.objects.all()
#     )

#     class Meta:
#         model = Match
#         fields = '__all__'



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


# --- SET ---
class SetSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, read_only=True)
    player_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Player.objects.all(),
        source='players',
        write_only=True
    )

    class Meta:
        model = Set
        fields = ['id', 'match', 'number', 'players', 'player_ids', 'home_score', 'guest_score']


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
