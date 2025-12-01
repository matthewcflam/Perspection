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
from Models import GoogleModel, MetaTopFiveSenderModel, MetaTopFiveReceivedModel
from Models import YoutubeLikedModel, YoutubeModel, YoutubeSubscribedModel, TopLikedCreatorModel
import data_collection.insta_parser as p
import datetime  # Add this at the top for timestamps
from data_collection.google_client import GoogleClient
blp = Blueprint("linked_socials", __name__, description = "Operations on linked social media accounts")

# For linking socials
@blp.route("/link")
class LinkSocials(MethodView):

    @jwt_required()
    @blp.arguments(PlainLinkedSocialSchema)
    @blp.response(201, LinkedSocialViewSchema)
    def post(self, account_data):
        current_user_id = get_jwt_identity()
        platform = account_data["platform"]
        data_root = account_data["data"]
        account_name = account_data["account_name"]

        if platform not in ["meta", "google"]:
            abort(409, message="Must be either Meta or Google account")
        if not data_root:
            abort(409, message="Must pass in account data root")
        if not account_name:
            abort(409, message="Must pass in account username or nickname")

        user = UserModel.query.get_or_404(current_user_id)
        linked_socials = user.socials

        if linked_socials is None:
            linked_socials = LinkedSocialsModel(user=user)
            db.session.add(linked_socials)
            db.session.flush()

        try:
            # === META (Instagram) ===
            if platform == "meta":
                meta = linked_socials.meta
                if not meta:
                    meta = MetaModel(
                        name=account_name,
                        linked_socials=linked_socials,
                        followers_count=0,
                        following_count=0
                    )
                    db.session.add(meta)
                    db.session.flush()

                processed_data = p.InstagramParser(data_root)

                # 1. Followers
                try:
                    meta.followers_count = processed_data.followers()
                except (ValueError, FileNotFoundError, KeyError):
                    pass

                # 2. Following
                try:
                    meta.following_count = processed_data.following()
                except (ValueError, FileNotFoundError, KeyError):
                    pass

                # 3. Not Following Back
                try:
                    not_following_back = processed_data.get_following_only()
                    for username in not_following_back:
                        row = MetaNotFollowingBackModel(meta=meta, username=username)
                        db.session.add(row)
                except (ValueError, FileNotFoundError, KeyError):
                    pass

                # 4. Messages
                try:
                    messages_map = processed_data.get_recent_messages()
                    for other_user, msg_list in messages_map.items():
                        msg_row = MetaMessagesModel(
                            meta=meta,
                            other_username=other_user,
                            messages=msg_list[-20:]
                        )
                        db.session.add(msg_row)
                except (ValueError, FileNotFoundError, KeyError):
                    pass

                # 5. Liked Accounts
                try:
                    liked_tup = processed_data.get_top_5_users()
                    for username, like_count in liked_tup:
                        db.session.add(
                            MetaLikedModel(
                                meta=meta,
                                liked_name=username,
                                number_likes=like_count
                            )
                        )
                except (ValueError, FileNotFoundError, KeyError):
                    pass

                # 6. Top 5 Receivers
                try:
                    top_5_receivers = processed_data.get_top_5_user_recievers()
                    for user, _ in top_5_receivers:
                        db.session.add(
                            MetaTopFiveReceivedModel(meta=meta, username=user)
                        )
                except (ValueError, FileNotFoundError, KeyError):
                    pass

                # 7. Top 5 Senders
                try:
                    top_5_senders = processed_data.get_top_5_user_msg()
                    for user, _ in top_5_senders:
                        db.session.add(
                            MetaTopFiveSenderModel(meta=meta, username=user)
                        )
                except (ValueError, FileNotFoundError, KeyError):
                    pass

                db.session.commit()

            # === GOOGLE (YouTube) ===
            else:
                if linked_socials.google:
                    abort(409, message="Google account already linked")
                
                try:
                    client = GoogleClient(
                        creds_path="backend/data_collection/credentials.json",
                        token_path="backend/data_collection/token.json"
                    )
                    start_date = "1970-01-01T00:00:00Z"
                    end_date = datetime.datetime.utcnow().isoformat().replace("+00:00", "Z")

                    liked_data = client.youtube.get_user_liked_videos_in_range(
                        start_date=start_date, end_date=end_date, limit=500
                    )
                    liked_videos = liked_data["videos"]
                    total_liked_videos = liked_data["count"]

                    top_liked_creators = client.youtube.get_most_liked_creators(
                        start_date=start_date, end_date=end_date
                    )

                    subscriptions_data = client.youtube.list_subscriptions_in_range(
                        start_date=start_date, end_date=end_date, limit=500
                    )
                    total_subscriptions = len(subscriptions_data)

                    google = GoogleModel(
                        name=account_name,
                        linked_socials_id=linked_socials.id
                    )
                    db.session.add(google)
                    db.session.flush()

                    youtube = YoutubeModel(
                        google_id=google.id,
                        total_subscriptions=total_subscriptions,
                        total_liked_videos=total_liked_videos
                    )
                    db.session.add(youtube)
                    db.session.flush()

                    for video in liked_videos:
                        liked_at_str = video.get("liked_at", "").replace("Z", "+00:00")
                        liked_at = datetime.datetime.fromisoformat(liked_at_str) if liked_at_str else datetime.datetime.utcnow()
                        
                        db.session.add(YoutubeLikedModel(
                            youtube_id=youtube.id,
                            video_id=video.get("video_id") or "unknown",
                            video_title=video.get("title") or "Unknown Video",
                            channel_id=video.get("channel_id") or "unknown",
                            channel_title=video.get("channel_title") or "Unknown Channel",
                            liked_at=liked_at
                        ))

                    for title in subscriptions_data:
                        cid = (title[:255] or "unknown_channel").strip()
                        if not cid: cid = "unknown_channel"
                        db.session.add(YoutubeSubscribedModel(
                            youtube_id=youtube.id,
                            channel_id=cid
                        ))

                    for creator in top_liked_creators[:5]:
                        db.session.add(TopLikedCreatorModel(
                            youtube_metrics_id=youtube.id,
                            channel_name=(creator.get("name") or "Unknown")[:100],
                            liked_videos_count=creator.get("liked_count", 0)
                        ))

                    db.session.commit()

                except Exception as e:
                    db.session.rollback()
                    abort(500, message=f"Failed to process YouTube data: {str(e)}")

            return linked_socials

        except IntegrityError:
            db.session.rollback()
            abort(400, message="Database integrity error while saving account data")
        except SQLAlchemyError:
            db.session.rollback()
            abort(400, message="Database error while saving account data")

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
