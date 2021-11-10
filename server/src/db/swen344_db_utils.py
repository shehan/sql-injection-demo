import psycopg2
import yaml
import os

def connect():
    config = {}
    yml_path = os.path.join(os.path.dirname(__file__), '../../config/db.yml')
    with open(yml_path, 'r') as file:
        config = yaml.load(file, Loader=yaml.FullLoader)
    return psycopg2.connect(dbname=config['database'],
                            user=config['user'],
                            password=config['password'],
                            host=config['host'],
                            port=config['port'])

def exec_sql_file(path):
    full_path = os.path.join(os.path.dirname(__file__), f'{path}')
    conn = connect()
    cur = conn.cursor()
    print(full_path)
    with open(full_path, 'r') as file:
        cur.execute(file.read())
    conn.commit()
    conn.close()

def initialize_db():
    exec_sql_file('schema.sql')

def exec_get_one(sql, args={}):
    conn = connect()
    cur = conn.cursor()
    cur.execute(sql, args)
    one = cur.fetchone()
    conn.close()
    return one

def exec_get_all(sql, args={}):
    conn = connect()
    cur = conn.cursor()
    cur.execute(sql, args)
    # https://www.psycopg.org/docs/cursor.html#cursor.fetchall
    list_of_tuples = cur.fetchall()
    conn.close()
    return list_of_tuples

def exec_commit(sql, args={}):
    conn = connect()
    cur = conn.cursor()
    result = cur.execute(sql, args)
    conn.commit()
    conn.close()
    return result


def exec_insert_returning(sql, args={}):
    """
    Execute the SQL statement, commits the change, and returns the primary key created.
    Intended for data changes, not queries.
    This will ASSUME that you have a RETURNING at the end of your SQL.
        If you don't, it'll hang, so make sure you use it properly!
    If you DON'T need the primary key or some other RETURNING clause,
        use exec_commit instead.
    Parameters:
        sql - string of SQL to execute
        args - dictionary of named parameters for psycopg2's
                prepared statements
    Example:
        # Count the number of rows where "foo" is "baz"
        id = exec_insert_returning("INSERT INTO mytable(user, email) VALUES (%(userfoo)s,%(emailfoo)s) RETURNING id",
                    {'userfoo': 'john', 'emailfoo': 'john.doe@example.com'})
        # id has the primary key of the new record
    """
    conn = connect()
    cur = conn.cursor()
    cur.execute(sql, args)
    postgresql_returning = cur.fetchone()[0]
    conn.commit()
    conn.close()
    return postgresql_returning