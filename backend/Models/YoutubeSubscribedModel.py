# in Models/YoutubeSubscribedModel.py
from DataBase import db

class YoutubeSubscribedModel(db.Model):
    __tablename__ = "youtube_subscriptions"
    
    id = db.Column(db.Integer, primary_key=True)
    youtube_id = db.Column(db.Integer, db.ForeignKey("youtube_metrics.id"), nullable=False)
    channel_id = db.Column(db.String(255), nullable=False)
    
    # Relationships
    youtube = db.relationship("YoutubeModel", back_populates="subscriptions")
