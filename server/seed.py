#!/usr/bin/env python3

# Standard library imports
from random import random, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

fake = Faker()

def create_reviews():
    reviews = []
    for _ in range(500):
        review = {
            "title": fake.title,
            "author": fake.name(),
            "rating": random.randint(1, 5),
            "content": fake.paragraph()
        }
        reviews.append(review)

    return reviews

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Starting seed...")
        # Seed code goes here!
