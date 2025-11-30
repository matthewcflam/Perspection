# Models/YouTubeModel.py
from DataBase import db
from datetime import datetime

class YoutubeModel(db.Model):
    __tablename__ = "youtube_metrics"

    id = db.Column(db.Integer, primary_key=True)

    google_id = db.Column(
        db.Integer,
        db.ForeignKey("google.id", ondelete="CASCADE"),
        nullable=False,
        unique=True
    )
    
    total_subscriptions = db.Column(db.Integer, default=0)
    total_liked_videos = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    google = db.relationship("GoogleModel", back_populates="youtube")
    liked_videos = db.relationship("YoutubeLikedModel", back_populates="youtube", cascade="all, delete-orphan")
    subscriptions = db.relationship("YoutubeSubscribedModel", back_populates="youtube", cascade="all, delete-orphan")
    top_liked_creators = db.relationship("TopLikedCreatorModel", back_populates="youtube", cascade="all, delete-orphan")