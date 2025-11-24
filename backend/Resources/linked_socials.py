'''
This is in charge of linking / unlinking accounts to this user
'''

from flask.views import MethodView
# Blueprint divides APIs into segments
from flask_smorest import Blueprint, abort
# Access tokens for user authentication
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from DataBase import db
from schemas import PlainLinkedSocialSchema, LinkedSocialViewSchema
from Models import UserModel, LinkedSocialsModel, MetaModel, MetaMessagesModel, MetaNotFollowingBackModel, MetaLikedModel
from Models import GoogleModel, MetaTopFiveReceiverModel, MetaTopFiveSenderModel
import data_collection.insta_parser as p

blp = Blueprint("linked_socials", __name__, description = "Operations on linked social media accounts")

# For linking socials
@blp.route("/link")
class LinkSocials(MethodView):

    @jwt_required()
    @blp.arguments(PlainLinkedSocialSchema)
    @blp.response(201, LinkedSocialViewSchema)
    def post(self, account_data):
        # Authenticate user
        current_user_id = get_jwt_identity()
        platform = account_data["platform"]
        data_root = account_data["data"]
        account_name = account_data["account_name"]

        # Verify valid platform
        if (platform != "meta" and platform != "google"):
            abort(409, message = "Must be either Meta or Google account")
        # Verify data
        if (not data_root):
            abort(409, message = "Must pass in account data root")
        # Verify username
        if (not account_name):
            abort(409, message = "Must pass in account username or nickname")

        user = UserModel.query.get_or_404(current_user_id)

        # Create linked socials if not created yet
        linked_socials = user.socials
        if linked_socials is None:
            linked_socials = LinkedSocialsModel(user = user)
            db.session.add(linked_socials)
            # Instantiate in db before creating platform instance
            db.session.flush()

        try:
            # Meta
            if (platform == "meta"):
                # Reject if account already has linked social
                if linked_socials.meta:
                    abort(409, message = "Meta account already linked")

                processed_data = p.InstagramParser(data_root)
                followers = processed_data.followers() # Integer
                following = processed_data.following() # Integer
                liked_tup = processed_data.get_top_5_users() # Hashmap of most liked : like count
                messages_map = processed_data.get_recent_messages() # Hashmap of user : List(String)
                not_following_back = processed_data.get_following_only() # List(String)
                top_5_receivers = processed_data.get_top_5_user_recievers() # List(String)
                top_5_senders = processed_data.get_top_5_user_msg() # List(String)

                # Meta name, linked socials, follower count, following count
                meta = MetaModel(
                    name = account_name,
                    linked_socials = linked_socials,
                    followers_count = followers,
                    following_count = following
                )
                # Add to db
                db.session.add(meta)
                db.session.flush()

                # --- Children ---
                # 1. Not following back
                for username in not_following_back:
                    row = MetaNotFollowingBackModel(
                        meta = meta,
                        username = username
                    )
                    db.session.add(row)

                # 2. Messages (last 20 per user)
                for other_user, msg_list in messages_map.items():
                    msg_row = MetaMessagesModel(
                        meta           = meta,
                        other_username = other_user,
                        # Only last 20 messages
                        messages       = msg_list[-20:]
                    )
                    db.session.add(msg_row)

                # 3. Likers (who and how many posts they liked)
                for username, like_count in liked_tup:
                    db.session.add(
                        MetaLikedModel(
                            meta         = meta,
                            liked_name   = username,
                            number_likes = like_count
                        )
                    )

                # 4. Top 5 receivers
                for user in top_5_receivers:
                    db.session.add(
                        MetaTopFiveReceiverModel(
                            meta = meta,
                            username = user
                        )
                    )

                # 5. Top 5 sender
                for user in top_5_senders:
                    db.session.add(
                        MetaTopFiveSenderModel(
                            meta = meta,
                            username = user
                        )
                    )
                
                db.session.commit()

            # Google
            else:
                # If Google account linked, reject
                if linked_socials.google:
                    abort(409, message = "Google account already linked")
            
            return linked_socials
        
        except IntegrityError:
            # Prevent any corruption by rolling back changes
            db.session.rollback()
            abort(400, message = "Database integrity error while saving account data")
        except SQLAlchemyError:
            db.session.rollback()
            abort(400, message = "Database error while saving account data")

# Unlink Meta account
@blp.route("/unlink/meta")
class UnlinkSocials(MethodView):

    @jwt_required()
    @blp.response(204)
    def delete(self):
        current_user_id = get_jwt_identity()
        
        # Delete the only Meta instance belonging to this user
        meta = (
            MetaModel.query
            .join(MetaModel.linked_socials)
            .filter(LinkedSocialsModel.user_id == current_user_id)
            .first()
        )

        if meta is None:
            abort(404, message = "No linked Meta account found")

        db.session.delete(meta)
        db.session.commit()

        return "Meta account successfully unlinked"
    
# Unlink Google account
@blp.route("/unlink/google")
class UnlinkSocials(MethodView):

    @jwt_required()
    @blp.response(204)
    def delete(self):
        current_user_id = get_jwt_identity()
        
        # Delete the only Google instance belonging to this user
        google = (
            GoogleModel.query
            .join(GoogleModel.linked_socials)
            .filter(LinkedSocialsModel.user_id == current_user_id)
            .first()
        )

        if google is None:
            abort(404, message = "No linked Google account found")

        db.session.delete(google)
        db.session.commit()

        return "Google account successfully unlinked"