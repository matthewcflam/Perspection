from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity

from DataBase import db
from Models import MetaModel, LinkedSocialsModel, YoutubeModel
from schemas import (
    MetaTopFiveSenderSchema,
    MetaTopFiveReceivedSchema,
    MetaMessagesSchema,
    MetaNotFollowingBackSchema,
    MetaLikedSchema,
)

blp = Blueprint("meta_insights", __name__, description="Precomputed Meta insights")


@blp.route("/meta/top5/senders")
class MetaTopSenders(MethodView):
    @jwt_required()
    @blp.response(200, MetaTopFiveSenderSchema(many=True))
    def get(self):
        user_id = get_jwt_identity()
        meta = (
            db.session.query(MetaModel)
            .join(MetaModel.linked_socials)
            .filter(LinkedSocialsModel.user_id == user_id)
            .first()
        )
        if not meta:
            abort(404, message="No linked Meta account found")
        return meta.top_five_sender


@blp.route("/meta/top5/receivers")
class MetaTopReceivers(MethodView):
    @jwt_required()
    @blp.response(200, MetaTopFiveReceivedSchema(many=True))
    def get(self):
        user_id = get_jwt_identity()
        meta = (
            db.session.query(MetaModel)
            .join(MetaModel.linked_socials)
            .filter(LinkedSocialsModel.user_id == user_id)
            .first()
        )
        if not meta:
            abort(404, message="No linked Meta account found")
        return meta.top_five_receiver


@blp.route("/meta/messages")
class MetaMessages(MethodView):
    @jwt_required()
    @blp.response(200, MetaMessagesSchema(many=True))
    def get(self):
        user_id = get_jwt_identity()
        meta = (
            db.session.query(MetaModel)
            .join(MetaModel.linked_socials)
            .filter(LinkedSocialsModel.user_id == user_id)
            .first()
        )
        if not meta:
            abort(404, message="No linked Meta account found")
        return meta.messages


@blp.route("/meta/not-following-back")
class MetaNotFollowingBack(MethodView):
    @jwt_required()
    @blp.response(200, MetaNotFollowingBackSchema(many=True))
    def get(self):
        user_id = get_jwt_identity()
        meta = (
            db.session.query(MetaModel)
            .join(MetaModel.linked_socials)
            .filter(LinkedSocialsModel.user_id == user_id)
            .first()
        )
        if not meta:
            abort(404, message="No linked Meta account found")
        return meta.not_following_back


@blp.route("/meta/top-likers")
class MetaTopLikers(MethodView):
    @jwt_required()
    @blp.response(200, MetaLikedSchema(many=True))
    def get(self):
        user_id = get_jwt_identity()
        meta = (
            db.session.query(MetaModel)
            .join(MetaModel.linked_socials)
            .filter(LinkedSocialsModel.user_id == user_id)
            .first()
        )
        if not meta:
            abort(404, message="No linked Meta account found")
        return meta.liked