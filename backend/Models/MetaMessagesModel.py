from DataBase import db

class MetaMessagesModel(db.Model):
    __tablename__ = "meta_messages"

    id = db.Column(db.Integer, primary_key = True)

    meta_id = db.Column(
        db.Integer,
        db.ForeignKey("meta.id", ondelete = "CASCADE"),
        nullable = False
    )

    meta = db.relationship(
        "MetaModel",
        back_populates = "messages"
    )

    username = db.Column(db.String(30), nullable = False)

    # Store messages as list
    messages = db.Column(db.JSON, default = list)
    