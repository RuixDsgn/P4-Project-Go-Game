#!/usr/bin/env python3

# Standard library imports
from random import random, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Review, Order


def create_reviews():
    reviews = []
    for _ in range(500):
        r = Review(
            title=fake.title(),
            rating=random.randint(1, 5),
            content=fake.paragraph()
        )
        reviews.append(r)

    return reviews

def create_orders():
    orders = []
    for _ in range(20):
        o = Order(
            order=random.randint(1,100)
        )
        orders.append(o)

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing db...")
        Review.query.delete()
        Order.query.delete()

        print("Seeding reviews...")
        reviews = create_reviews()
        db.session.add(reviews)
        db.session.commit()

        print("Seeding orders...")
        orders = create_orders()
        db.session.add(orders)
        db.session.commit()


        print("Done seeding!")
        # Seed code goes here!
