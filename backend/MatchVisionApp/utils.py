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
conn = create_engine(f'postgresql://{user}:{password}@{host}:{port}/{database}')

def create_table_match_stats(match_id):

    query = """SELECT p.id, p.name || ' ' || p.surname AS player, t.fundamental, t.outcome, COUNT(*) AS num_touches, (COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY p.id, t.fundamental)) AS perc 
                FROM "MatchVisionApp_touch" t
                JOIN "MatchVisionApp_set" s ON s.id = t.set_id
                JOIN "MatchVisionApp_player" p ON p.id = t.player_id
                WHERE s.match_id = %s
                GROUP BY p.id, player, t.fundamental, t.outcome
                ORDER BY p.id, player, t.fundamental, t.outcome
            """
    
    df = pd.read_sql_query(query, conn, params=(match_id,))
    df['perc'] = pd.to_numeric(df['perc'], errors='coerce')

    # cell creation
    df['dato'] = df['num_touches'].astype(int).astype(str) + " (" + df['perc'].round(1).astype(str) + "%)"

    df_pivot = pd.pivot_table(df, 
                            index=['fundamental', 'outcome'], 
                            columns=['id', 'player'], 
                            values='dato', 
                            aggfunc='first', 
                            fill_value='-'
                        )

    df_tot = df.groupby(['fundamental', 'id', 'player'])['num_touches'].sum().unstack(['id','player'])
    df_tot['outcome'] = 'tot'
    df_tot = df_tot.set_index('outcome', append=True)

    df_tot = df_tot.astype(str)

    df_final = pd.concat([df_pivot, df_tot])

    df_final = df_final.sort_index(level=[0,1], key=lambda x: x.map(lambda y: (y=='tot', y)))

    df_final = df_final.fillna('-')

    if isinstance(df_final.columns, pd.MultiIndex):
        df_final.columns = ['_'.join([str(c) for c in col if c]) for col in df_final.columns]

    # to rename columns
    df_final = df_final.rename(columns=lambda x: x.split("_", 1)[1] if "_" in x else x)

    return df_final



def create_table_set_stats(set_id):

    query = """SELECT p.id, p.name || ' ' || p.surname AS player, t.fundamental, t.outcome, COUNT(*) AS num_touches, (COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY p.id, t.fundamental)) AS perc 
                FROM "MatchVisionApp_touch" t
                JOIN "MatchVisionApp_set" s ON s.id = t.set_id
                JOIN "MatchVisionApp_player" p ON p.id = t.player_id
                WHERE s.id = %s
                GROUP BY p.id, player, t.fundamental, t.outcome
                ORDER BY p.id, player, t.fundamental, t.outcome
            """
    
    df = pd.read_sql_query(query, conn, params=(set_id,))
    df['perc'] = pd.to_numeric(df['perc'], errors='coerce')

    # cell creation
    df['dato'] = df['num_touches'].astype(int).astype(str) + " (" + df['perc'].round(1).astype(str) + "%)"

    df_pivot = pd.pivot_table(df, 
                            index=['fundamental', 'outcome'], 
                            columns=['id', 'player'], 
                            values='dato', 
                            aggfunc='first', 
                            fill_value='-'
                        )

    df_tot = df.groupby(['fundamental', 'id', 'player'])['num_touches'].sum().unstack(['id','player'])
    df_tot['outcome'] = 'tot'
    df_tot = df_tot.set_index('outcome', append=True)

    df_tot = df_tot.astype(str)

    df_final = pd.concat([df_pivot, df_tot])

    df_final = df_final.sort_index(level=[0,1], key=lambda x: x.map(lambda y: (y=='tot', y)))

    df_final = df_final.fillna('-')

    if isinstance(df_final.columns, pd.MultiIndex):
        df_final.columns = ['_'.join([str(c) for c in col if c]) for col in df_final.columns]

    # to rename columns
    df_final = df_final.rename(columns=lambda x: x.split("_", 1)[1] if "_" in x else x)

    return df_final


def create_table_set_player(set_id, player_id):
    query = """
        SELECT t.fundamental, t.outcome, COUNT(*) AS num_touches
        FROM "MatchVisionApp_touch" t
        JOIN "MatchVisionApp_set" s ON s.id = t.set_id
        JOIN "MatchVisionApp_player" p ON p.id = t.player_id
        WHERE s.id = %s AND p.id = %s
        GROUP BY t.fundamental, t.outcome
        ORDER BY t.fundamental, t.outcome
    """
    
    df = pd.read_sql_query(query, conn, params=(set_id, player_id,))
    
    if df.empty:
        return pd.DataFrame()
    
    df_pivot = pd.pivot_table(
        df,
        index="outcome",
        columns="fundamental",
        values="num_touches",
        aggfunc="sum",
        fill_value=0
    )
    
    totals = df_pivot.sum(axis=0).to_frame().T
    totals.index = ["tot"]
    
    df_final = pd.concat([df_pivot, totals])
    
    df_final = df_final.reset_index()
    
    return df_final
