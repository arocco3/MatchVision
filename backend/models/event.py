from enums.event_types import EventType

#cards, timeouts,....
class Event:
    def __init__(self, event_type: EventType):
        self.event_type = event_type