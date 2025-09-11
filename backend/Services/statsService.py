
import pandas as pd
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.engine import URL

# DB PARAMS
database="db_prova"
host="localhost"
user="postgres"
password="adminPostgres"
port="5432"

# Connection creation
conn = create_engine(f'postgresql://{user}:{password}@{host}:5432/{database}')

players: str

sql_query = 'SELECT * FROM "MatchVisionApp_touch"'

