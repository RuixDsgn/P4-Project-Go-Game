#!/usr/bin/env python3
from models import db, User, Review, Wishlist, Cart, Order
from config import app, db, api
from flask_migrate import Migrate
from flask import Flask, request, make_response
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
        response = post('https://api.igdb.com/v4/games', 
                        **{'headers': {'Client-ID': 'ejajggmd25hikofltc3nwzt34lhf7b', 'Authorization': f'Bearer {access_token}'},
                        'data': 'fields id, name, first_release_date, genres.name, platforms.name, screenshots.url, screenshots.id, similar_games.name, summary, cover.url; where platforms.name ="Nintendo Switch"; limit 10;'})
        return response.json()
api.add_resource(Games, '/games')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
