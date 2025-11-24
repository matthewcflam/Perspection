from DataBase import db

class MetaNotFollowingBackModel(db.Model):
    __tablename__ = "meta_not_following_back"

    id = db.Column(db.Integer, primary_key = True)

    meta_id = db.Column(
        db.Integer,
        db.ForeignKey("meta.id", ondelete = "CASCADE"),
        nullable = False
    )

    meta = db.relationship(
        "MetaModel",
        back_populates = "not_following_back"
    )

    username = db.Column(db.String(30), nullable = False)