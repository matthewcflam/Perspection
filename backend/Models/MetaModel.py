from DataBase import db

class MetaModel(db.Model):
    __tablename__ = "meta"

    id = db.Column(db.Integer, primary_key = True)

    # Parent user id
    linked_socials_id = db.Column(
        db.Integer,
        db.ForeignKey("linked_socials.id", ondelete = "CASCADE"), # Delete this if user deleted
        nullable = True # Linked socials is optional
    )

    linked_socials = db.relationship(
        "LinkedSocialsModel",
        back_populates = "meta"
    )

    # Meta username
    name = db.Column(db.String(100), nullable = False)

    # Children
    followers = db.relationship(
        "MetaFollowersModel",
        back_populates = "meta",
        casecase = "all, delete-orphan"
    )

    following = db.relationships(
        "MetaFollowersModel",
        back_populates = "meta",
        cascade = "all, delete-orphan"
    )

    likers = db.relationship(
        "MetaLikersModel",
        back_populates = "meta",
        cascade = "all delete-orphan"
    )

    liked = db.relationship(
        "MetaLikedModel",
        back_populates = "meta",
        cascade = "all delete-orphan"
    )