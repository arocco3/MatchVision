from enums.roles import Role

class Player:
    def __init__(self, name, surname, number, role: Role):
        self.name = name
        self.surname = surname
        self.number = number
        self.role = role
        self.fundamentals = []