from DataBase import db

class YoutubeWatchedModel(db.Model):
    __tablename__ = "youtube_watched"

    id = db.Column(db.Integer, primary_key = True)

    google_id = db.Column(
        db.Integer,
        db.ForeignKey("google.id", ondelete = "CASCADE"),
        nullable = False
    )

    google = db.relationship(
        "GoogleModel",
        back_populates = "youtube_watched"
    )

    video_id = db.Column(db.Integer, nullable = False)
    video_name = db.Column(db.String(50), nullable = False)