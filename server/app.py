#!/usr/bin/env python3
import os
from config import app, api
from models import User, Review, Wishlist, Cart, Order
from flask import Flask, request, make_response, session, jsonify
from flask_migrate import Migrate
from flask_restful import Resource
from sqlalchemy import func
from requests import post
from dotenv import load_dotenv

dotenv_path = "../.env" 
load_dotenv(dotenv_path)
secret_key = os.environ.get("SECRET_KEY")
app.secret_key = secret_key

# Set the BASE_DIR and DATABASE
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

# Set the database URI in the app configuration
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.json.compact = False

# Import db and Migrate here after setting the database URI
from config import db, migrate

class Games(Resource):
    def get(self):
        access_token = 'wa64dthtybfhlt4oslfnz85gpjeasu'
        response = post('https://api.igdb.com/v4/games', 
                        **{'headers': {'Client-ID': 'ejajggmd25hikofltc3nwzt34lhf7b', 'Authorization': f'Bearer {access_token}'},
                        'data': 'fields id, name, rating, first_release_date, cover.url, genres.name, platforms.name, similar_games.id, similar_games.name, similar_games.cover.url, similar_games.genres.name, summary, screenshots.url; where platforms.id = [6, 130, 167, 169]  & rating > 85;limit 500;'})
        return response.json()
api.add_resource(Games, '/games')

class GameSearch(Resource):
    def get(self):
        results = request.args.get('results')
        access_token = 'wa64dthtybfhlt4oslfnz85gpjeasu'
        response = post('https://api.igdb.com/v4/games', 
                        **{'headers': {'Client-ID': 'ejajggmd25hikofltc3nwzt34lhf7b', 'Authorization': f'Bearer {access_token}'},
                        'data': f'fields id, name, rating, first_release_date, cover.url, genres.name, platforms.name, similar_games.id, similar_games.name, similar_games.cover.url, similar_games.genres.name, summary, screenshots.url; where platforms.id = [6, 130, 167, 169]  & name ~ *"{results}"*  & rating > 85;limit 500;'})
        return response.json()     
api.add_resource(GameSearch, '/games/search')  

class GamesById(Resource):
    def get(self):
        id = request.args.get('id')
        access_token = 'wa64dthtybfhlt4oslfnz85gpjeasu'
        response = post('https://api.igdb.com/v4/games', 
                        **{'headers': {'Client-ID': 'ejajggmd25hikofltc3nwzt34lhf7b', 'Authorization': f'Bearer {access_token}'},
                        'data': f'fields id, name, rating, first_release_date, cover.url, genres.name, platforms.name, similar_games.id, similar_games.name, similar_games.cover.url, similar_games.genres.name, summary, screenshots.url; where id = {id}; limit 1;'})
        return response.json()
api.add_resource(GamesById, '/games/product')

class Ps5(Resource):
    def get(self):
        access_token = 'wa64dthtybfhlt4oslfnz85gpjeasu'
        response = post('https://api.igdb.com/v4/games', 
                        **{'headers': {'Client-ID': 'ejajggmd25hikofltc3nwzt34lhf7b', 'Authorization': f'Bearer {access_token}'},
                        'data': 'fields id, name, rating, cover.url, genres.name, platforms.name, similar_games.id, similar_games.name, summary, screenshots.url;where platforms.name = "PlayStation 5" & name ~ *"ar"*;limit 3;'})
        return response.json()
api.add_resource(Ps5, '/games/ps5')

class Nintendo(Resource):
    def get(self):
        access_token = 'wa64dthtybfhlt4oslfnz85gpjeasu'
        response = post('https://api.igdb.com/v4/games', 
                        **{'headers': {'Client-ID': 'ejajggmd25hikofltc3nwzt34lhf7b', 'Authorization': f'Bearer {access_token}'},
                        'data': 'fields id, name, rating, cover.url, genres.name, platforms.name, similar_games.id, similar_games.name, summary, screenshots.url;where platforms.name = "Nintendo Switch" & name ~ *"sup"*;limit 3;'})
        return response.json()
api.add_resource(Nintendo, '/games/nintendo_switch')

class Xbox(Resource):
    def get(self):
        access_token = 'wa64dthtybfhlt4oslfnz85gpjeasu'
        response = post('https://api.igdb.com/v4/games', 
                        **{'headers': {'Client-ID': 'ejajggmd25hikofltc3nwzt34lhf7b', 'Authorization': f'Bearer {access_token}'},
                        'data': 'fields id, name, rating, cover.url, genres.name, platforms.name, similar_games.id, similar_games.name, summary, screenshots.url;where platforms.name = "Xbox Series X|S" & name ~ *"elde"*;limit 3;'})
        return response.json()
api.add_resource(Xbox, '/games/xbox')

class Pc(Resource):
    def get(self):
        access_token = 'wa64dthtybfhlt4oslfnz85gpjeasu'
        response = post('https://api.igdb.com/v4/games', 
                        **{'headers': {'Client-ID': 'ejajggmd25hikofltc3nwzt34lhf7b', 'Authorization': f'Bearer {access_token}'},
                        'data': 'fields id, name, rating, cover.url, genres.name, platforms.name, similar_games.id, similar_games.name, summary, screenshots.url;where platforms.name = "PC (Microsoft Windows)" & name ~ *"de"*;limit 3;'})
        return response.json()
api.add_resource(Pc, '/games/pc')

class Reviews(Resource):
    def get(self):
        reviews_list = [review.to_dict() for review in Review.query.all()]
        return make_response(reviews_list, 200)
    def post(self):
        form_json = request.get_json()
        try:
            new_review = Review(
                content=form_json['content'],
                rating=form_json['rating'],
                user_id=form_json['user_id'],
                game_id=form_json['game_id'],
                title = form_json['title']
            )
            db.session.add(new_review)
            db.session.commit()
            return make_response(new_review.to_dict(), 201)
        except ValueError as e:
            return make_response({'error': str(e)}, 400)
api.add_resource(Reviews, '/reviews')

class ReviewsById(Resource):
    def get(self, id):
        review_get = Review.query.filter_by(id=id).first()
        if review_get:
            return make_response(review_get.to_dict(), 200)
        else:
            return make_response({"error": "review not found"}, 404)
    def delete(self, id):
        review_get = Review.query.filter_by(id=id).first()
        if review_get:
            db.session.delete(review_get)
            db.session.commit()
            return make_response({}, 204)
        else:
            return make_response({"error": "review not found"}, 404)
    def patch(self, id):
        review_get = Review.query.filter_by(id=id).first()
        if review_get:
            try:
                for attr in request.form:
                    setattr(review_get, attr, request.form[attr])
                db.session.commit()
                return make_response(review_get.to_dict(), 202)
            except ValueError as e:
                return make_response({'error': str(e)}, 400)
        else:
            return make_response({"error": "Review not found"}, 404)
api.add_resource(ReviewsById, '/reviews/<int:id>')

class Wishlists(Resource):
    def get(self):
        wishlists_list = [wishlist.to_dict() for wishlist in Wishlist.query.all()]
        return make_response(wishlists_list, 200)
    def post(self):
        form_json = request.get_json()
        try:
            new_wishlist = Wishlist(
                content=form_json['content'],
                rating=form_json['rating'],
                user_id=form_json['user_id'],
                game_id=form_json['game_id'],
                title = form_json['title']
            )
            db.session.add(new_wishlist)
            db.session.commit()
            return make_response(new_wishlist.to_dict(), 201)
        except ValueError as e:
            return make_response({'error': str(e)}, 400)
api.add_resource(Wishlists, '/wishlist')

class Carts(Resource):
    def get(self):
        carts_list = [cart.to_dict() for cart in Cart.query.all()]
        return make_response(carts_list, 200)
    def post(self):
        form_json = request.get_json()
        try:
            new_cart = Cart(
                content=form_json['content'],
                rating=form_json['rating'],
                user_id=form_json['user_id'],
                game_id=form_json['game_id'],
                title = form_json['title']
            )
            db.session.add(new_cart)
            db.session.commit()
            return make_response(new_cart.to_dict(), 201)
        except ValueError as e:
            return make_response({'error': str(e)}, 400)
api.add_resource(Carts, '/cart')

class Orders(Resource):
    def get(self):
        orders_list = [order.to_dict() for order in Order.query.all()]
        return make_response(orders_list, 200)
    def post(self):
        form_json = request.get_json()
        try:
            new_order = Order(
                content=form_json['content'],
                rating=form_json['rating'],
                user_id=form_json['user_id'],
                game_id=form_json['game_id'],
                title = form_json['title']
            )
            db.session.add(new_order)
            db.session.commit()
            return make_response(new_order.to_dict(), 201)
        except ValueError as e:
            return make_response({'error': str(e)}, 400)
api.add_resource(Orders, '/order')

class Register(Resource):
    def post(self):
        # Get the registration data from the request's JSON body
        username = request.json.get('username')
        password = request.json.get('password')
        # Perform any necessary validation on the registration data
        if not username or not password:
            return {'message': 'Username and password are required'}, 400

        # Check if the username is already taken (e.g., query the database)
        existing_user = User.query.filter(func.lower(User.name) == func.lower(username)).first()
        if existing_user:
            return {'message': 'Username is already taken'}, 409  # 409 Conflict status code for duplicate resource

        try:
            # Assuming the registration is successful, create a new user record in the database
            new_user = User(name=username, password=password)
            db.session.add(new_user)
            db.session.commit()
            response = make_response(new_user.to_dict(), 201)
        except Exception as e:
            # Handle any database-related errors here
            db.session.rollback()
            return {'message': str(e)}, 422

        # Return a success response indicating the registration was successful
        return response  # 201 Created status code for successful resource creation
api.add_resource(Register, '/register')

class Login(Resource):

    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter(User.name == username).first()

        user = User.query.filter(
            User.name == request.get_json()['username']
        ).first()

        if not user:
            return {'message': 'User not found'}, 404
        
        if user.check_password(password):
            session['user_id'] = user.id
            return user.to_dict()
        else:
            return {'message': 'Invalid credentials'}, 401
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
