from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity

from DataBase import db
from Models import YoutubeModel, GoogleModel, LinkedSocialsModel
from schemas import (
    YoutubeSchema,
    YoutubeLikedSchema,
    YoutubeSubscribedSchema,
    TopLikedCreatorSchema,
)

blp = Blueprint("youtube_insights", __name__, description="Precomputed YouTube insights")


@blp.route("/youtube/summary")
class YoutubeSummary(MethodView):
    @jwt_required()
    @blp.response(200, YoutubeSchema)
    def get(self):
        user_id = get_jwt_identity()
        youtube = (
            db.session.query(YoutubeModel)
            .join(YoutubeModel.google)
            .join(GoogleModel.linked_socials)
            .filter(LinkedSocialsModel.user_id == user_id)
            .first()
        )
        if not youtube:
            abort(404, message="No linked YouTube account found")
        return youtube


@blp.route("/youtube/liked-videos")
class YoutubeLikedVideos(MethodView):
    @jwt_required()
    @blp.response(200, YoutubeLikedSchema(many=True))
    def get(self):
        user_id = get_jwt_identity()
        youtube = (
            db.session.query(YoutubeModel)
            .join(YoutubeModel.google)
            .join(GoogleModel.linked_socials)
            .filter(LinkedSocialsModel.user_id == user_id)
            .first()
        )
        if not youtube:
            abort(404, message="No linked YouTube account found")
        return youtube.liked_videos


@blp.route("/youtube/subscriptions")
class YoutubeSubscriptions(MethodView):
    @jwt_required()
    @blp.response(200, YoutubeSubscribedSchema(many=True))
    def get(self):
        user_id = get_jwt_identity()
        youtube = (
            db.session.query(YoutubeModel)
            .join(YoutubeModel.google)
            .join(GoogleModel.linked_socials)
            .filter(LinkedSocialsModel.user_id == user_id)
            .first()
        )
        if not youtube:
            abort(404, message="No linked YouTube account found")
        return youtube.subscriptions


@blp.route("/youtube/top-liked-creators")
class YoutubeTopLikedCreators(MethodView):
    @jwt_required()
    @blp.response(200, TopLikedCreatorSchema(many=True))
    def get(self):
        user_id = get_jwt_identity()
        youtube = (
            db.session.query(YoutubeModel)
            .join(YoutubeModel.google)
            .join(GoogleModel.linked_socials)
            .filter(LinkedSocialsModel.user_id == user_id)
            .first()
        )
        if not youtube:
            abort(404, message="No linked YouTube account found")
        return youtube.top_liked_creators