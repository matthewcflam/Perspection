from flask.views import MethodView
# Blueprint divides APIs into segments
from flask_smorest import Blueprint, abort
# Hashes the password that the user enters and saves to database
from passlib.hash import pbkdf2_sha256
# Access tokens for user authentication
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from DataBase import db
from schemas import PlainUserSchema
from Models import UserModel

blp = Blueprint("users", __name__, description = "Operations on user")

# Sign-up public endpoint
@blp.route("/register")
class UserRegister(MethodView):

    @blp.arguments(PlainUserSchema)
    def post(self, user_data):
        try:
            # Exception if username exists
            if UserModel.query.filter(UserModel.username == user_data["username"]).first():
                abort(409, message = "Username already in use")
            
            user = UserModel(
                username = user_data["username"],
                password = pbkdf2_sha256.hash(user_data["password"])
            )

            db.session.add(user)
            db.session.commit()

            return {"message": "User created successfully"}, 201
        
        except IntegrityError:
            # Prevent any corruption by rolling back changes
            db.session.rollback()
            abort(400, message = "Database integrity error while saving account")
        except SQLAlchemyError:
            db.session.rollback()
            abort(400, message = "Database error while saving account")
        # Otherwise print generic error message with the root
        except Exception as e:
            db.session.rollback()
            abort(500, message = f"Unexpected error occurred: {e}")


