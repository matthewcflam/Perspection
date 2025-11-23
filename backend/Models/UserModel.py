# User model defining column name and fields for the database

from DataBase import db

class UserModel(db.Model):
    __tablename__ = "users" # Name in database

    # Store id as int
    id = db.Column(db.Integer, primary_key = True)
    
    # Unique username
    username = db.Column(db.String(80), unique = True, nullable = False)

    # Password up to 256 chars
    password = db.Column(db.String(256), nullable = False)

    # Relationship to "LinkedSocialsModel" child (one-to-one)
    socials = db.relationship("LinkedSocialsModel", # Model name
        back_populates = "user", # Field name in LinkedSocialsModel
        uselist = False, # Don't use list, one-to-one relationship
        cascade = "all, delete-orphan" # Delete the linked socials if user is deleted
        )
    
