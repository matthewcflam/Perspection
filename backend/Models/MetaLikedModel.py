from DataBase import db

class MetaLikedModel(db.Model):
    __tablename__ = "meta_liked"

    id = db.Column(db.Integer, primary_key = True)

    meta_id = db.Column(
        db.Integer,
        db.ForeignKey("meta.id", ondelete = "CASCADE"),
        nullable = False
    )

    meta = db.relationship(
        "MetaModel",
        back_populates = "liked"
    )

    # Posts you liked
    liked_id = db.Column(db.Integer, nullable = False)
    # Post identifier
    liked_identifier = db.Column(db.String(30), nullable = True)