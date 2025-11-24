from DataBase import db

class LinkedSocialsModel(db.Model):
    __tablename__ = "linked_socials"

    # This id
    id = db.Column(db.Integer, primary_key = True)

    # Parent user id
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete = "CASCADE"), # Delete this if user deleted
        nullable = True # Linked socials is optional
    )

    # To navigate to parent user
    user = db.relationship(
        "UserModel",
        back_populates = "socials"
    )

    # Meta account
    meta = db.relationship(
        "MetaModel",
        back_populates = "linked_socials", # Parent db label
        uselist = False, # Only up to 1 account
        cascade = "all, delete-orphan"
    )

    # Google account
    google = db.relationship(
        "GoogleModel",
        back_populates = "linked_socials",
        uselist = False,
        cascade = "all, delete-orphan"
    )
