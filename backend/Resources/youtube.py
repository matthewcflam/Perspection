"""
This is in charge for all operations YouTube-specific
"""

from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from DataBase import db
from schemas import YouTubeViewSchema
from Models import UserModel, LinkedSocialsModel, YouTubeModel, YouTubeSubscriptionModel, YouTubeLikedVideoModel

blp = Blueprint("youtube", __name__, description="Operations with YouTube statistics")


"""
Gets all metrics belonging to a user including:
- total_subscriptions (int)
- total_liked_videos (int)
- most_subscribed_channel (object)
- most_niche_channel (object)
- top_liked_creators (List(object))
- liked_videos (List(object))
"""
@blp.route("/all_youtube_metrics")
class YouTubeMetricsView(MethodView):

    @jwt_required()
    @blp.response(200, YouTubeViewSchema)
    def get(self):
        current_user_id = get_jwt_identity()

        # Fetch user
        user = UserModel.query.get_or_404(current_user_id)

        # Check if linked socials exist
        linked_socials = user.socials
        if linked_socials is None or linked_socials.youtube is None:
            abort(404, message="No linked socials or YouTube account found")

        # YouTubeModel is expected to already contain all precomputed metrics
        return linked_socials.youtube


