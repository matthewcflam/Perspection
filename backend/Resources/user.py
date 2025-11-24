'''
Creating users, logging in, logging out, and deleting users
'''

from flask.views import MethodView
# Blueprint divides APIs into segments
from flask_smorest import Blueprint, abort
# Hashes the password that the user enters and saves to database
from passlib.hash import pbkdf2_sha256
# Access tokens for user authentication
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from DataBase import db
from schemas import PlainUserSchema, UserGetSchema
from Models import UserModel, TokenBlocklistModel

blp = Blueprint("users", __name__, description = "Operations on user")

# Sign-up public endpoint
@blp.route("/register")
class UserRegister(MethodView):

    @blp.arguments(PlainUserSchema)
    def post(self, user_data):
        try:
            name = user_data["username"]
            password = user_data["password"]

            # Verify name length
            if (len(name) < 3):
                abort(409, message = "Username must be longer than 3 characters")
            # Verify password length
            if (len(password) < 8):
                abort(409, message = "Password must be greater than 8 characters")
            # Verify unique username
            if UserModel.query.filter(UserModel.username == name).first():
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


# Sign-in public endpoint
@blp.route("/login")
class UserLogin(MethodView):

    @blp.arguments(PlainUserSchema)
    def post(self, user_data):
        # Verify username
        user = UserModel.query.filter(
            UserModel.username == user_data["username"]
        ).first()

        # Verify password
        if user and pbkdf2_sha256.verify(user_data["password"], user.password):
            # Grant access token
            access_token = create_access_token(identity = user.id)
            return {"access_token": access_token}
        
        # If not returned by this point, invalid credentials
        abort(401, message = "Invalid credentials")


# Logging out
@blp.route("/logout")
class UserLogout(MethodView):
    # jwt required: user msut be logged in to perform these actions
    @jwt_required()
    def post(self):
        # Get jwt id
        jti = get_jwt()["jti"]
        if not TokenBlocklistModel.query.filter_by(blocked_jwt = jti).first():
            db.session.add(TokenBlocklistModel(blocked_jwt = jti))
            db.session.commit()
        return {"message": "Logged out successfully"}
    

# Get basic user information
@blp.route("/user/<int:user_id>")
class User(MethodView):

    @jwt_required()
    @blp.response(200, UserGetSchema)
    def get(self, user_id):
        current_user_id = get_jwt_identity()

        if current_user_id != user_id:
            abort(403, message = "Unauthorized to perform this action")

        user = UserModel.query.get_or_404(user_id)
        # Returns the user's linked socials, username, and user id
        return user
    
    @jwt_required()
    def delete(self, user_id):
        current_user_id = get_jwt_identity()

        if current_user_id != str(user_id):
            abort(403, message = "Unauthorized to perform this action")

        user = UserModel.query.get_or_404(user_id)
        try:
            db.session.delete(user)
            db.session.commit()
            return {"message": "User deleted"}
        
        except IntegrityError:
            db.session.rollback()
            abort(400, message = "Database integrity error while deleting account")
        except SQLAlchemyError:
            db.session.rollback()
            abort(400, message = "Database error while deleting account")
        # Otherwise print generic error message with the root
        except Exception as e:
            db.session.rollback()
            abort(500, message = f"Unexpected error occurred: {e}")

