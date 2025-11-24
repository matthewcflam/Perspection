from DataBase import db

class MetaTopFiveReceivedModel(db.Model):
    __tablename__ = "meta_top_five_receiver"

    id = db.Column(db.Integer, primary_key = True)

    meta_id = db.Column(
        db.Integer,
        db.ForeignKey("meta.id", ondelete = "CASCADE"),
        nullable = False
    )

    meta = db.relationship(
        "MetaModel",
        back_populates = "top_five_receiver"
    )

    username = db.Column(db.String(30), nullable = False)