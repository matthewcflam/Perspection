# in Models/TopLikedCreatorModel.py
from DataBase import db

class TopLikedCreatorModel(db.Model):
    __tablename__ = "top_liked_creator"

    id = db.Column(db.Integer, primary_key=True)
    
    youtube_metrics_id = db.Column(
        db.Integer,
        db.ForeignKey("youtube_metrics.id", ondelete="CASCADE"),  # ✅ FIXED
        nullable=False
    )
    
    channel_name = db.Column(db.String(100), nullable=False)
    liked_videos_count = db.Column(db.Integer, nullable=False)

    # Relationship
    youtube = db.relationship("YoutubeModel", back_populates="top_liked_creators")