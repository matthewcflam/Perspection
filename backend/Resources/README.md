# Resources Folder

## The resources folder contains all the endpoints (and the logic) required for user interaction. This bridges the functionality of the front end, enabling the user to perform the appropriate actions based on what they select on the front end.

# Schemas:
Plain schemas are for core attributes for a model
(like for UserModel, required basic fields are 
id, username, password). Every plain schema must have
an id. Other schemas are extensions (like for MetaWrappedSchema, this could take in many fields which are used as an intermediate process for data processing). Extension schemas should inherit their parent plain user schema as its superclass.

# Endpoints to consider:
GET - Retrieve (dump) information.

POST - Send (load) information. You can also dump information in response to the user if you want. You should usually dump IDs for the objects created at the very least.

PATCH - Edit existing fields for an exisiting object. Can dump info back to user as well.

DELETE - Delete an instance of a field or object in database.

# Protected vs public endpoints:
Protected endpoints should have the @jwt_required() decorator. You should additionally ensure that the jwt
belongs to the actual user. Otherwise, any verified user can perform actions on another user's account. Public endpoints don't require verification or the decorator.