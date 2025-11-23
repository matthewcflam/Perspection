# This is to add expired jwt tokens to the blocklist
# when users explicitly logout
# Must use PostgreSQL to respect datetime and timezone!

from DataBase import db
from datetime import datetime, timezone

class TokenBlocklistModel(db.Model):
    __tablename__ = "token_blocklist"
    id = db.Column(db.Integer, primary_key = True)
    expired_jwt = db.Column(db.String(100), unique = True, nullable = False, index = True)
    created_at = db.Column(
        # DateTime object column
        db.DateTime(timezone = True),
        default = lambda: datetime.now(timezone.utc),
        nullable = False
    )