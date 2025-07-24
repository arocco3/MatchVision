from datetime import datetime

class Match:
    def __init__(self, name: datetime):
        self.name = datetime.datetime.now().timestamp()
        self.sets = []
        self.current_set = None
        self.events = []
        self.result = None  #match result in this format: [(0, 0), (0, 0), (0, 0), ...]
