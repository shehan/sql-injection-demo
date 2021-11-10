from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from api.UserEndpoint import User, Login, Search
from db.swen344_db_utils import initialize_db

app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(User, '/user')
api.add_resource(Login, '/login')
api.add_resource(Search, '/search')


@app.route("/dbsetup")
def db_setup():
    initialize_db()
    return 'Database Setup/Reset Complete.'


if __name__ == '__main__':
    app.run(debug=True, host='localhost')
