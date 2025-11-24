'''
This is in charge for all operations Meta-specific
'''

from flask.views import MethodView
# Blueprint divides APIs into segments
from flask_smorest import Blueprint, abort
# Access tokens for user authentication
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from DataBase import db
from schemas import MetaViewSchema
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