import os
from datetime import timedelta

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_smorest import Api

from DataBase import db
# IMPORTED TokenBlocklistModel for the logout callback
from Models import TokenBlocklistModel 

from Resources.user import blp as UserBlueprint
from Resources.linked_socials import blp as LinkedSocialsBlueprint
from Resources.meta import blp as MetaBlueprint
from Resources.youtube_insights import blp as YoutubeBlueprint


def create_app():
    app = Flask(__name__)

    # ==== Flask-Smorest / OpenAPI config ====
    app.config["API_TITLE"] = "Project Alder API"
    app.config["API_VERSION"] = "1.0.0"
    app.config["OPENAPI_VERSION"] = "3.0.3"

    # ==== CORS config ====
    FRONTEND_URL = os.getenv("FRONTEND_URL", "*")
    origins = [url.strip() for url in FRONTEND_URL.split(",")] if FRONTEND_URL != "*" else ["*"]

    CORS(
        app,
        resources={r"/*": {
            "origins": origins,
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

    # ==== TEMP FIX: Create tables if they don't exist (Fixes 500 Error) ====
    # Remove this block after your tables are successfully created in Cloud SQL
    with app.app_context():
        db.create_all()

    Migrate(app, db)
    
    # JWT Blocklist Callback
    jwt = JWTManager(app)

    @jwt.token_in_blocklist_loader
    def check_if_token_in_blocklist(jwt_header, jwt_payload):
        jti = jwt_payload["jti"]
        # Check if the JTI is in the blocklist table
        token = db.session.query(TokenBlocklistModel.id).filter_by(expired_jwt=jti).scalar()
        return token is not None

    api = Api(app)

    # ==== Blueprints ====
    api.register_blueprint(UserBlueprint)
    api.register_blueprint(MetaBlueprint)
    api.register_blueprint(LinkedSocialsBlueprint)
    api.register_blueprint(YoutubeBlueprint)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=False)