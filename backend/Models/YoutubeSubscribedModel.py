from DataBase import db

class YoutubeSubscribedModel(db.Model):
    __tablename__ = "youtube_subscribed"

    id = db.Column(db.Integer, primary_key=True)

    google_id = db.Column(
        db.Integer,
        db.ForeignKey("google.id", ondelete = "CASCADE"),
        nullable = False
    )

    google = db.relationship(
        "GoogleModel",
        back_populates = "youtube_subscribed"
    )

    # Subscribed channel
    channel_id = db.Column(db.Integer, nullable = False)
    channel_name = db.Column(db.String(30), nullable = False)