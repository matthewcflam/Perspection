# app.py instantiates the app, and connects to all necessary tools
# such as the database, frontend url, backend url and other configs

import os
from datetime import timedelta

from flask import Flask
from DataBase import db

from flask_smorest import Api
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS

# .[file] should match resource names. Will update once endpoints are setup
from Resources.user import blp as UserBlueprint
from Resources.linked_socials import blp as LinkedSocialsBlueprint
from Resources.meta import blp as MetaBlueprint
from Resources.google import blp as GoogleBlueprint
from Resources.wrapped import blp as WrappedBlueprint

# Flask app instance
def create_app():
    app = Flask(__name__)

    FRONTEND_URL = os.getenv("FRONTEND_URL")
    
    # Access for front-end to host on separate server
    CORS(
        app,
        resources={r"/*": {
            "origins": [FRONTEND_URL] if FRONTEND_URL else ["*"],
            "supports_credentials": True,
            "methods": ["GET", "POST", "DELETE", "PATCH", "OPTIONS", "PUT"],
            "allow_headers": ["Content-Type", "Authorization", "Accept"],
            "expose_headers": ["Content-Type", "Authorization"],
            "max_age": 86400,
        }},
    )

    # Database setup
    database_url = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Validates JSON payloads (enforce this)
    jwt_secret = os.getenv("JWT_SECRET_KEY")
    if not jwt_secret:
        raise RuntimeError("JWT_SECRET_KEY is not set")
    app.config["JWT_SECRET_KEY"] = jwt_secret
    # Access tokens expire after 3 hours
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours = 3)

    # Initializations
    db.init_app(app)
    api = Api(app)
    # Allow migrations from local to GCP when we deploy
    Migrate(app, db)
    jwt = JWTManager(app)

    # For each file containing endpoints (resources folder)
    # Groups api routes
    api.register_blueprint(UserBlueprint)
    api.register_blueprint(MetaBlueprint)
    api.register_blueprint(GoogleBlueprint)
    api.register_blueprint(WrappedBlueprint)
    api.register_blueprint(LinkedSocialsBlueprint)

    return app