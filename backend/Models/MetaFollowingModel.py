from DataBase import db

class MetaFollowingModel:
    __tablename__ = "meta_following"

    id = db.Column(db.Integer, primary_key = True)

    meta_id = db.Column(
        db.Integer,
        db.ForeignKey("meta.id", ondelete = "CASCADE"),
        nullable = False
    )

    meta = db.relationship(
        "MetaModel",
        back_populates = "following"
    )

    # Account this Meta user is following
    following_id = db.Column(db.Integer, nullable = False)
    following_name = db.Column(db.String(30), nullable = True)