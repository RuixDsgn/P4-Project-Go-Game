from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
import bcrypt
from config import db

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# ! Games db external, may use internal if issues arise
# class Games(db.Model, SerializerMixin):
#     pass

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
        forbidden_words = ['fuck','shit','bitch']
        existing_user = User.query.filter(func.lower(User.name) == func.lower(name)).first()
        if not existing_user:
            if 5 < len(name) < 20 and ' ' not in name:
                for word in forbidden_words:
                    if word not in func.lower(name):
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
            self.set_password(password)
        else:
            raise ValueError("Don't make your password password.")

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    created_at = db.Column(db.DateTime, default = datetime.utcnow)
    updated_at = db.Column(db.DateTime, default = datetime.utcnow, onupdate = datetime.utcnow)

    @validates('content')
    def validate_content(self, key, content):
        forbidden_words = ['fuck','shit','bitch']
        if 50 < len(content):
            for word in forbidden_words:
                if word in func.lower(content):
                    raise ValueError("Language.")
            return content
        else:
            raise ValueError("Must be over 50 characters")

class Wishlist(db.Model, SerializerMixin):
    __tablename__ = 'wishlists'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    created_at = db.Column(db.DateTime, default = datetime.utcnow)
    updated_at = db.Column(db.DateTime, default = datetime.utcnow, onupdate = datetime.utcnow)

class Cart(db.Model, SerializerMixin):
    __tablename__ = 'carts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))

    created_at = db.Column(db.DateTime, default = datetime.utcnow)
    updated_at = db.Column(db.DateTime, default = datetime.utcnow, onupdate = datetime.utcnow)

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default = datetime.utcnow)
    updated_at = db.Column(db.DateTime, default = datetime.utcnow, onupdate = datetime.utcnow)

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    title = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default = datetime.utcnow)
    updated_at = db.Column(db.DateTime, default = datetime.utcnow, onupdate = datetime.utcnow)

    # need to add db.relationship to user and game
