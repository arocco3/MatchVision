
import pandas as pd
import psycopg2
from psycopg2 import sql
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

sql_query = 'SELECT * FROM "MatchVisionApp_touch"'

df = pd.read_sql_query(sql_query, conn)

print(df)