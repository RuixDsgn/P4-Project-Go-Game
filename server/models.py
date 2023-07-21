# from flask_sqlalchemy import SQLAlchemy
# from ipdb import set_trace
from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from config import db
import bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    _password = db.Column(db.String)  # Use a different name for the actual password column
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        password_bytes = password.encode('utf-8')
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password_bytes, salt)
        self._password = hashed_password.decode('utf-8')

    def check_password(self, password):
        password_bytes = password.encode('utf-8')
        hashed_password_bytes = self._password.encode('utf-8')
        return bcrypt.checkpw(password_bytes, hashed_password_bytes)

    @validates('name')
    def validate_name(self, key, name):
        print("name")
        forbidden_words = ['fuck','shit','bitch']
        existing_user = User.query.filter(User.name.lower() == name.lower()).first()
        if not existing_user:
            if 5 <= len(name) <= 20 and ' ' not in name:
                for word in forbidden_words:
                    if word not in name.lower():
                        return name
                    else:
                        raise ValueError('Language.')
            else:
                raise ValueError('Name must be between 5 and 20 characters and have no spaces.')
        else:
            raise ValueError('Name is already taken.')

    @property
    def password(self):
        raise AttributeError("password is not a readable attribute")

    @password.setter
    def password(self, password):
        if password != 'password':
            print("something")
            self.set_password(password)
        else:
            raise ValueError("Don't make your password password.")

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default = datetime.utcnow)
    updated_at = db.Column(db.DateTime, default = datetime.utcnow, onupdate = datetime.utcnow)

    @validates('content')
    def validate_content(self, key, content):
        forbidden_words = ['fuck','shit','bitch']
        if 15 < len(content):
            for word in forbidden_words:
                if word in content.lower():
                    raise ValueError("Language.")
            return content
        else:
            raise ValueError("Must be over 50 characters")

class Wishlist(db.Model, SerializerMixin):
    __tablename__ = 'wishlists'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default = datetime.utcnow)
    updated_at = db.Column(db.DateTime, default = datetime.utcnow, onupdate = datetime.utcnow)

class Cart(db.Model, SerializerMixin):
    __tablename__ = 'carts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, default = datetime.utcnow)
    updated_at = db.Column(db.DateTime, default = datetime.utcnow, onupdate = datetime.utcnow)

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default = datetime.utcnow)
    updated_at = db.Column(db.DateTime, default = datetime.utcnow, onupdate = datetime.utcnow)

