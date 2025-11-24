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

    # Who you liked
    liked_name = db.Column(db.String(30), nullable = False)

    # Number of posts you liked
    number_likes = db.Column(db.Integer, nullable = False, default = 0)