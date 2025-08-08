# from typing import List

# from models.player import Player


# # In-memory DB simulato
# players_db: list[Player] = []

# # POST /players/
# @app.post('/players/', response_model = Player)
# def create_player(player: Player):
#     player.id = len(players_db) + 1
#     players_db.append(player)
#     return player

# # GET /players/
# @app.get('/players/', response_model = List[Player])
# def get_all_players():
#     return players_db

# # GET /players/{player_id} anche PUT per modificarlo
# @app.get('/players/{player_id}', response_model = Player)
# def get_player_by_id(player_id: int):
#     for p in players_db:
#         if p.id == player_id:
#             return p
#     raise HTTPException(status_code=404, detail="Giocatore non trovato")

# # PUT per la modifica del nome e cognome
# @app.put('/players/{player_id}')
# def update_player_name(player_id: int, update_name: str, update_surname: str):
#     for index, p in enumerate(players_db):
#         if p.id == player_id:
#             players_db[index].name = update_name
#             players_db[index].surname = update_surname

# # DELETE /players/{player_id}
# @app.delete("/players/{player_id}")
# def delete_player(player_id: int):
#     for index, p in enumerate(players_db):
#         if p.id == player_id:
#             players_db.pop(index)
#             return {"detail": "Giocatore eliminato"}
#     raise HTTPException(status_code = 404, detail="Giocatore non trovato")