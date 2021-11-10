import urllib

from flask import request, jsonify
from flask_restful import Resource

from db.swen344_db_utils import exec_get_all, exec_get_one, exec_commit


class Login(Resource):
    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')

        # Don't do this
        sql = "select role from users where user_name='%s' and password='%s'" % (username, password)
        output = exec_get_one(sql)

        # Do this
        # sql = "select role from users where user_name=%s and password=%s"
        # output = exec_get_one(sql,[username,password])

        if output is None:
            response = jsonify(status='False', role='')
        else:
            response = jsonify(status='True', role=output[0])
        response.status_code = 200
        return response


class Search(Resource):
    def get(self):
        search_text = urllib.parse.unquote(request.args.get('q', type=str))

        # Don't do this
        sql = "SELECT user_name FROM users WHERE user_name ilike '%%%%%s%%%%';" % search_text
        output = exec_get_all(sql)

        # Do this
        # sql = "SELECT user_name FROM users WHERE user_name ilike %s;"
        # output = exec_get_all(sql,['%'+search_text+'%'])

        response = jsonify(result=output)
        response.status_code = 200
        return response


class User(Resource):
    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')

        # Don't do this
        sql = "INSERT INTO USERS (USER_NAME, PASSWORD) VALUES ('%s', '%s');" %(username, password)
        exec_commit(sql)

        # Do this
        # sql = "INSERT INTO USERS (USER_NAME, PASSWORD) VALUES (%s, %s);"
        # exec_commit(sql, [username,password])

        response = jsonify(status='True')
        response.status_code = 200
        return response





