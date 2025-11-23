# Models Folder

## The models folder contains all of the data types, i.e. the models for user data, Meta data, etc. These all have unique rules and fields for storing information and relationships in the database.

# Endpoints to consider:
GET - Retrieve (dump) information.

POST - Send (load) information. You can also dump information in response to the user if you want. You should usually dump IDs for the objects created at the very least.

PATCH - Edit existing fields for an exisiting object. Can dump info back to user as well.

DELETE - Delete an instance of a field or object in database.

# Protected vs public endpoints:
Protected endpoints should have the @jwt_required() decorator. You should additionally ensure that the jwt
belongs to the actual user. Otherwise, any verified user can perform actions on another user's account. Public endpoints don't require verification or the decorator.
