from DataBase import db

class GoogleModel(db.Model):
    __tablename__ = "google"

    id = db.Column(db.Integer, primary_key = True)

    # Parent user id
    linked_socials_id = db.Column(
        db.Integer,
        db.ForeignKey("linked_socials.id", ondelete = "CASCADE"), # Delete this if user deleted
        nullable = True # Linked socials is optional
    )

    linked_socials = db.relationship(
        "LinkedSocialsModel",
        back_populates = "google"
    )

    # Google account name
    name = db.Column(db.String(100), nullable = False)

    # Children (YouTube)
    youtube_watched = db.relationship(
        "YoutubeWatchedModel",
        back_populates = "google",
        cascade = "all, delete-orphan"
    )

    youtube_subscribed = db.relationship(
        "YoutubeSubscribedModel",
        back_populates = "google",
        cascade = "all, delete-orphan"
    )

    youtube_liked = db.relationship(
        "YoutubeLikedModel",
        back_populates = "google",
        cascade = "all, delete-orphan"
    )