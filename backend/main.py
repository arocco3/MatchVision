from fastapi import FastAPI
from backend.controllers import user_controller

app = FastAPI()

app.include_router(user_controller.router, prefix="/api/user", tags=["User"])