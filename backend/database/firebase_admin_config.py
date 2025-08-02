import firebase_admin
from firebase_admin import credentials, auth, firestore
import os
from dotenv import load_dotenv

load_dotenv()

path = os.getenv("FIREBASE_CREDENTIALS")
print("Firebase credentials path:", path)
cred = credentials.Certificate(os.getenv("FIREBASE_CREDENTIALS"))

default_app = firebase_admin.initialize_app(cred)

db = firestore.client()