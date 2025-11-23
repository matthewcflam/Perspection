from flask.views import MethodView
# Blueprint divides APIs into segments
from flask_smorest import Blueprint, abort
# Hashes the password that the user enters and saves to database
from passlib.hash import pbkdf2_sha256
# Access tokens for user authentication
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from DataBase import db
from schemas import MetaFollowerSchema, MetaFollowingSchema, MetaLikedSchema, MetaLikerSchema, MetaViewSchema
from Models import MetaModel, MetaFollowersModel, MetaFollowingModel, MetaLikedModel, MetaLikersModel

blp = Blueprint("meta", __name__, description = "Operations with Meta statistics")