# in Models/YoutubeLikedModel.py
from DataBase import db

class YoutubeLikedModel(db.Model):
    __tablename__ = "youtube_liked_videos"
    
    id = db.Column(db.Integer, primary_key=True)
    youtube_id = db.Column(db.Integer, db.ForeignKey("youtube_metrics.id"), nullable=False)
    video_id = db.Column(db.String(255), nullable=False)
    video_title = db.Column(db.String(255), nullable=False)
    channel_id = db.Column(db.String(255))
    channel_title = db.Column(db.String(255))
    liked_at = db.Column(db.DateTime, nullable=False)
    
    # Relationships
    youtube = db.relationship("YoutubeModel", back_populates="liked_videos")