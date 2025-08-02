from fastapi import APIRouter, HTTPException, Header, Depends
from backend.services.firebase_service import verify_token
from backend.database.firebase_admin_config import db

router = APIRouter()

def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Header di autorizzazione non valido")
    token = authorization.split(" ")[1]
    return verify_token(token)

@router.get("/profile")
def get_profile(user=Depends(get_current_user)):
    uid = user["uid"]
    user_doc = db.collection("users").document(uid).get()
    if user_doc.exists:
        return user_doc.to_dict()
    return {"message": "Nessun dato trovato"}

def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token non valido")
    token = authorization.split(" ")[1]
    return verify_token(token)

# Endpoint: recupera profilo utente da Firestore
@router.get("/me")
def get_user_profile(user=Depends(get_current_user)):
    uid = user["uid"]
    user_doc = db.collection("users").document(uid).get()
    if user_doc.exists:
        return user_doc.to_dict()
    return {"message": "Profilo non trovato"}

# endpoint: aggiorna i dati utente (es. nome o email)
@router.post("/me")
def update_user_profile(data: dict, user=Depends(get_current_user)):
    uid = user["uid"]
    db.collection("users").document(uid).set(data, merge=True)
    return {"message": "Profilo aggiornato correttamente"}