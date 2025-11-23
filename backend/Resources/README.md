# Resources Folder

## The resources folder contains all the endpoints (and the logic) required for user interaction. This bridges the functionality of the front end, enabling the user to perform the appropriate actions based on what they select on the front end.

## Schemas:
Plain schemas are for core attributes for a model
(like for UserModel, required basic fields are 
id, username, password). Every plain schema must have
an id. Other schemas are extensions (like for MetaWrappedSchema, this could take in many fields which are used as an intermediate process for data processing). Extension schemas should inherit their parent plain user schema as its superclass.