'''
This is in charge for all operations Meta-specific
'''

from flask.views import MethodView
# Blueprint divides APIs into segments
from flask_smorest import Blueprint, abort
# Access tokens for user authentication
from flask_jwt_extended import get_jwt_identity, jwt_required

from DataBase import db
from schemas import (
    MetaTopFiveSenderSchema,
    MetaTopFiveReceivedSchema,
    MetaMessagesSchema,
    MetaNotFollowingBackSchema,
    MetaLikedSchema,
    MetaViewSchema
)
from Models import UserModel, LinkedSocialsModel, MetaModel, MetaLikedModel, MetaMessagesModel, MetaNotFollowingBackModel

blp = Blueprint("meta", __name__, description = "Operations with Meta statistics")

'''
Gets all metrics belonging to a user including:
Meta ID (int)
followers (int)
following (int)
who doesn't follow back (List(Str))
who's posts you liked (List(Str))
number of posts you liked for that user (int)
top five senders of your messages (List(Str))
top five receivers of your messages (List(Str))
'''
@blp.route("/all_meta_metrics")
class MetaMetricsView(MethodView):

    @jwt_required()
    @blp.response(200, MetaViewSchema)
    def get(self):
        current_user_id = get_jwt_identity()

        user = UserModel.query.get_or_404(current_user_id)
        linked_socials = user.socials
        if linked_socials is None or linked_socials.meta is None:
            abort(404, message = "No linked socials or Meta account found")

        return linked_socials.meta
    
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