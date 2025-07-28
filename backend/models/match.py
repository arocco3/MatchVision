from datetime import datetime
from models.set import Set
from enums.event_types import EventType

class Match:
    def __init__(self, name: str):
        self.id = datetime.now().timestamp()
        self.name = name
        self.sets: list[Set] = []
        self.current_set = Set | None = None
        self.results: list[tuple[int, int]] = []  #match result in this format: [(25, 23), (23, 25), (21, 25), ...]

    def add_set(self, new_set: Set):
        self.sets.append(new_set)
        self.current_set = new_set

    def add_result(self, home_score: int, guest_score: int):
        self.results.append((home_score, guest_score))
