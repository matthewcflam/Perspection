from DataBase import db

class MetaFollowersModel(db.Model):
    __tablename__ = "meta_followers"

    id = db.Column(db.Integer, primary_key = True)

    meta_id = db.Column(
        db.Integer,
        db.ForeignKey("meta.id", ondelete = "CASCADE"),
        nullable = False
    )

    meta = db.relationship(
        "MetaModel",
        back_populates = "followers"
    )

    # Account following this meta user
    follower_id = db.Column(db.Integer, nullable = False)
    follower_name = db.Column(db.String(30), nullable = True)