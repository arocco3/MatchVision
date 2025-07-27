from enums.roles import Role
from enums.fundamentals import FundamentalType

class Player:
    def __init__(self, id, name, surname, number, role: Role):
        self.id = id
        self.name = name
        self.surname = surname
        self.number = number
        self.role = role
        self.fundamentals = [FundamentalType]