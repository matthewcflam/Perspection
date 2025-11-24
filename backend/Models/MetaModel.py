from DataBase import db

class MetaModel(db.Model):
    __tablename__ = "meta"

    id = db.Column(db.Integer, primary_key = True)

    # Parent user id
    linked_socials_id = db.Column(
        db.Integer,
        db.ForeignKey("linked_socials.id", ondelete = "CASCADE"), # Delete this if user deleted
        nullable = True, # Linked socials is optional
        unique = True
    )

    linked_socials = db.relationship(
        "LinkedSocialsModel",
        back_populates = "meta"
    )

    # Meta username
    name = db.Column(db.String(100), nullable = False)

    # Follower and following count
    followers_count = db.Column(db.Integer, nullable = False, default = 0)
    following_count = db.Column(db.Integer, nullable = False, default = 0)

    # Children
    not_following_back = db.relationship(
        "MetaNotFollowingBackModel",
        back_populates = "meta",
        cascade = "all, delete-orphan"
    )

    liked = db.relationship(
        "MetaLikedModel",
        back_populates = "meta",
        cascade = "all, delete-orphan"
    )

    messages = db.relationship(
        "MetaMessagesModel",
        back_populates = "meta",
        cascade = "all, delete-orphan"
    )

    top_five_receiver = db.relationship(
        "MetaMessagesModel",
        back_populates = "meta",
        cascade = "all, delete-orphan"
    )

    top_five_sender = db.relationship(
        "MetaMessagesModel",
        back_populates = "meta",
        cascade = "all, delete-orphan"
    )