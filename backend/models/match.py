from datetime import datetime
from models.set import Set
from enums.event_types import EventType

class Match:
    def __init__(self, id: datetime, name):
        self.id = datetime.datetime.now().timestamp()
        self.name = name
        self.sets = [Set]
        self.current_set = None
        self.events = [EventType]
        self.result = None  #match result in this format: [(0, 0), (0, 0), (0, 0), ...]
