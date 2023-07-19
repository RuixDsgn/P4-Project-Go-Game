#!/usr/bin/env python3
from models import db, User, Review, Wishlist, Cart, Order
from config import app, db, api
from flask_migrate import Migrate
from flask import Flask, request, make_response, session, jsonify
from flask_restful import Api, Resource
from requests import post
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

class Games(Resource):
    def get(self):
        access_token = 'wa64dthtybfhlt4oslfnz85gpjeasu'
        response = post('https://api.igdb.com/v4/games', 
                        **{'headers': {'Client-ID': 'ejajggmd25hikofltc3nwzt34lhf7b', 'Authorization': f'Bearer {access_token}'},
                        'data': 'fields id, name, first_release_date, genres.name, platforms.name, screenshots.url, screenshots.id, similar_games.name, summary, cover.url; where platforms.id ="6,130,167,169"; limit 500;'})
        return response.json()
api.add_resource(Games, '/games')

class GamesById(Resource):
    def get(self, id):
        access_token = 'wa64dthtybfhlt4oslfnz85gpjeasu'
        response = post('https://api.igdb.com/v4/games', 
                        **{'headers': {'Client-ID': 'ejajggmd25hikofltc3nwzt34lhf7b', 'Authorization': f'Bearer {access_token}'},
                        'data': f'fields id, name, first_release_date, genres.name, platforms.name, screenshots.url, screenshots.id, similar_games.name, summary, cover.url; where id = {id}; limit 500;'})
        return response.json()
api.add_resource(GamesById, '/games/<int:id>')

class Ps5(Resource):
    def get(self):
        access_token = 'wa64dthtybfhlt4oslfnz85gpjeasu'
        response = post('https://api.igdb.com/v4/games', 
                        **{'headers': {'Client-ID': 'ejajggmd25hikofltc3nwzt34lhf7b', 'Authorization': f'Bearer {access_token}'},
                        'data': 'fields id, name, first_release_date, genres.name, platforms.name, screenshots.url, screenshots.id, similar_games.name, summary, cover.url; where platforms.id =167; limit 3;'})
        return response.json()
api.add_resource(Ps5, '/games/ps5')

class Nintendo(Resource):
    def get(self):
        access_token = 'wa64dthtybfhlt4oslfnz85gpjeasu'
        response = post('https://api.igdb.com/v4/games', 
                        **{'headers': {'Client-ID': 'ejajggmd25hikofltc3nwzt34lhf7b', 'Authorization': f'Bearer {access_token}'},
                        'data': 'fields id, name, first_release_date, genres.name, platforms.name, screenshots.url, screenshots.id, similar_games.name, summary, cover.url; where platforms.id=130; limit 3;'})
        return response.json()
api.add_resource(Nintendo, '/games/ninentdo-switch')

class Xbox(Resource):
    def get(self):
        access_token = 'wa64dthtybfhlt4oslfnz85gpjeasu'
        response = post('https://api.igdb.com/v4/games', 
                        **{'headers': {'Client-ID': 'ejajggmd25hikofltc3nwzt34lhf7b', 'Authorization': f'Bearer {access_token}'},
                        'data': 'fields id, name, first_release_date, genres.name, platforms.name, screenshots.url, screenshots.id, similar_games.name, summary, cover.url; where platforms.id =169; limit 3;'})
        return response.json()
api.add_resource(Xbox, '/games/xbox')

class Pc(Resource):
    def get(self):
        access_token = 'wa64dthtybfhlt4oslfnz85gpjeasu'
        response = post('https://api.igdb.com/v4/games', 
                        **{'headers': {'Client-ID': 'ejajggmd25hikofltc3nwzt34lhf7b', 'Authorization': f'Bearer {access_token}'},
                        'data': 'fields id, name, first_release_date, genres.name, platforms.name, screenshots.url, screenshots.id, similar_games.name, summary, cover.url; where platforms.id =6; limit 3;'})
        return response.json()
api.add_resource(Pc, '/games/pc')


class Register(Resource):
    def post(self):
        # Get the registration data from the request's JSON body
        username = request.json.get('username')
        password = request.json.get('password')

        # Perform any necessary validation on the registration data
        if not username or not password:
            return {'message': 'Username and password are required'}, 400

        # Check if the username is already taken (e.g., query the database)
        # Perform any additional validation checks as needed

        # Assuming the registration is successful, create a new user record in the database
        # (e.g., insert a new row into the users table)

        # Return a success response indicating the registration was successful
        return {'message': 'Registration successful'}, 200
api.add_resource(Register, '/register')

class Login(Resource):

    def post(self):
        user = User.query.filter(
            User.username == request.get_json()['username']
        ).first()

        session['user_id'] = user.id
        return user.to_dict()
api.add_resource(Login, '/login')

class CheckSession(Resource):

    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')

class Logout(Resource):

    def delete(self):
        session['user_id'] = None
        return {}, 204

api.add_resource(Logout, '/logout')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
