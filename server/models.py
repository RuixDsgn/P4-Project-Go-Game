from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

from config import db

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# ! Games db external, may use internal if issues arise
# class Games(db.Model, SerializerMixin):
#     pass

class User(db.Model, SerializerMixin):
    pass

class Reviews(db.Model, SerializerMixin):
    pass

class Wishlist(db.Model, SerializerMixin):
    pass

class Cart(db.Model, SerializerMixin):
    pass

class Orders(db.Model, SerializerMixin):
    pass