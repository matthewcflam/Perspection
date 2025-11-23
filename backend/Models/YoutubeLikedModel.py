from DataBase import db

class YoutubeLikedModel(db.Model):
    __tablename__ = "youtube_liked"

    id = db.Column(db.Integer, primary_key=True)

    google_id = db.Column(
        db.Integer,
        db.ForeignKey("google.id", ondelete = "CASCADE"),
        nullable = False
    )

    google = db.relationship(
        "GoogleModel",
        back_populates = "youtube_liked"
    )

    # Liked video
    video_id = db.Column(db.Integer, nullable = False)
    video_identifier = db.Column(db.String(30), nullable = False)