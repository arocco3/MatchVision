from fastapi import FastAPI, HTTPException
from typing import List

from enums.fundamentals import FundamentalType
from enums.touch_results import TouchResult
from models.touch import Touch
from models.match import Match

app = FastAPI()

# POST /touches/
@app.post('/touches/')
def register_touch(touch: Touch):
    #todo
    return {touch}
    
# GET /touches/{match_id}/{set_number}
@app.get('/touches/{match_id}/{set_number}')
def get_tables_for_set(matches: list[Match], match_id: int, set_number: int):
    for match in matches:
        if match_id == match.id:
            for set in match.sets:
                if set.number == set_number:
                    return set.touches

# GET /touches/player/{player_id}
# @app.get('/touches/player/{player_id}')
# def get_touches_by_player_id(player_id: int):

    

# DELETE /touches/... per cancellare gli ultimi tocchi fino alla battuta precedente in caso di palla contesa
@app.delete('/set/touches/')
def get_tables_for_set(matches: list[Match], match_id: int, set_number: int):
    for match in matches:
        if match_id == match.id:
            for set in match.sets:
                if set.number == set_number:
                    set.delete_last_action()