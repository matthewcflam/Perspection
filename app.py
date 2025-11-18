# app.py instantiates the app, and connects to all necessary tools
# such as the database, frontend url, and other configs

import os
from flask import Flask

def create_app():
    app = Flask(__name__)

    # Taken from env variables in .flaskenv
    app.config["DATABASE_URL"] = os.getenv("DATABASE_URL")
    app.config["FRONTEND_URL"] = os.getenv("FRONTEND_URL")
    app.config["BACKEND_URL"] = os.getenv("BACKEND_URL")

