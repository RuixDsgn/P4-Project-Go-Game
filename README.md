GoGame - React-Flask App

GoGame is a GameStop clone that provides a platform for gamers to browse and search through a vast selection of games, powered by the IGDB API. This app also offers user authentication, allowing users to create accounts, log in, and log out. Additionally, users can leave game reviews and favorite their preferred games.

Table of Contents
Installation
Usage
Features

Installation
Before running the GoGame app, make sure you have the necessary dependencies installed for both the front end and back end.

Front End Dependencies
To install front end dependencies, navigate to the frontend directory and run: npm install

Back End Dependencies
For the back end, we use Pipenv to manage dependencies. To install the back end dependencies, navigate to the root directory of the project and run: pipenv install, pipenv shell

Database Setup
Make sure to set up your database as per your Flask-SQLAlchemy configuration in config.py. You can use SQLite for development purposes or any other database supported by SQLAlchemy.

Environment Variables
Create a .env file in the root directory and add the necessary environment variables. For example: SECRET_KEY=your_secret_key
DATABASE_URL=your_database_url
IGDB_API_KEY=your_igdb_api_key

Usage
To run the GoGame app, follow these steps:

Start the back end Flask server by running the following command in the root directory: python app.py

In a separate terminal, navigate to the frontend directory and start the React development server: npm start

The app will be accessible in your web browser at http://localhost:4000.

Features
User authentication (create account, login, logout).
Browse and search through a wide selection of games using the IGDB API.
Leave reviews for games.
Favorite games to keep track of your preferred titles.