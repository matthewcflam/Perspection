# app.py instantiates the app, and connects to all necessary tools
# such as the database, CORS config, JWT, and other configs.

import os
from datetime import timedelta

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_smorest import Api

from DataBase import db

# .[file] should match resource names. Will update once endpoints are setup
from Resources.user import blp as UserBlueprint
from Resources.linked_socials import blp as LinkedSocialsBlueprint
from Resources.meta import blp as MetaBlueprint


def create_app():
    app = Flask(__name__)

    # ==== Flask-Smorest / OpenAPI config ====
    app.config["API_TITLE"] = "Project Alder API"
    app.config["API_VERSION"] = "1.0.0"
    app.config["OPENAPI_VERSION"] = "3.0.3"

    # ==== CORS config ====
    FRONTEND_URL = os.getenv("FRONTEND_URL")
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

    # ==== Database config ====
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL is not set")
    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # ==== JWT config ====
    jwt_secret = os.getenv("JWT_SECRET_KEY")
    if not jwt_secret:
        raise RuntimeError("JWT_SECRET_KEY is not set")
    app.config["JWT_SECRET_KEY"] = jwt_secret
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=3)

    # ==== Extensions init ====
    db.init_app(app)
    Migrate(app, db)
    jwt = JWTManager(app)
    api = Api(app)

    # ==== Blueprints ====
    api.register_blueprint(UserBlueprint)
    api.register_blueprint(MetaBlueprint)
    api.register_blueprint(LinkedSocialsBlueprint)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
