from DataBase import db

class MetaLikersModel(db.Model):
    __tablename__ = "meta_likers"

    id = db.Column(db.Integer, primary_key = True)

    meta_id = db.Column(
        db.Integer,
        db.ForeignKey("meta.id", ondelete = "CASCADE"),
        nullable = False
    )

    meta = db.relationship(
        "MetaModel",
        back_populates = "likers"
    )

    # Who liked
    liker_id = db.Column(db.Integer, nullable = False)
    liker_name = db.Column(db.String(30), nullable = True)