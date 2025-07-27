from fastapi import APIRouter, HTTPException, Path
from pydantic import BaseModel
from enums.fundamentals import FundamentalType
from enums.touch_results import TouchResult
from models.touch import Touch
from models.player import Player
from models.set import Set

router = APIRouter()
# POST /matches/{match_id}/sets/{set_number}/touch

@router.post("/matches/{match_id}/sets/{set_number}/touch")
def register_touch(set_id: int = Path(...), touch_input: TouchInput = ...):