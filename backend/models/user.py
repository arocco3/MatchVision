from enum import Enum
from datetime import datetime
from models.team import Team
from models.player import Player
from models.match import Match

class User:
    def __init__(self, user_id: int, email: str, password: str, name: str, surname: str):
        self.user_id = user_id
        self.email = email
        self.password = password
        self.name = name
        self.surname = surname
        matchesList = list[Match]
        playersList = list[Player]
        teamsList = list[Team]        