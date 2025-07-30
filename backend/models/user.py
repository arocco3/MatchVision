from enum import Enum
from datetime import datetime

class User:
    def __init__(self, user_id: int, email: str, password: str, first_name: str, last_name: str):
        self.user_id = user_id
        self.email = email
        self.password = password
        self.first_name = first_name
        self.last_name = last_name