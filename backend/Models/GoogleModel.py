# Models/GoogleModel.py
from DataBase import db

class GoogleModel(db.Model):
    __tablename__ = "google"

    id = db.Column(db.Integer, primary_key=True)

    linked_socials_id = db.Column(
        db.Integer,
        db.ForeignKey("linked_socials.id", ondelete="CASCADE"),
        nullable=True
    )
    
    name = db.Column(db.String(100), nullable=False)

    # Relationships
    linked_socials = db.relationship("LinkedSocialsModel", back_populates="google")
    youtube = db.relationship("YoutubeModel", back_populates="google", uselist=False, cascade="all, delete-orphan")