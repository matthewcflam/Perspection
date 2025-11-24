from marshmallow import Schema, fields, validate

# --- Plain Schemas: Fields for core attributes and ID assignments ---
# --- Other Schemas: Extensions and non-essential fields / data for models ---

class PlainUserSchema(Schema):
    # Dump-only means user does not provide this field, and is sent back for client to see
    id = fields.Int(dump_only = True)
    username = fields.Str(required = True, validate = validate.Length(min = 3, max = 80))
    # Load-only means user must send but never view this field / be sent back
    password = fields.Str(required = True, load_only = True, validate = validate.Length(min = 8, max = 256))

class LinkedSocialViewSchema(Schema):
    # Serializes as null if no account linked for a given platform
    meta = fields.Nested("MetaViewSchema", dump_only = True, allow_none = True)
    google = fields.Nested("GoogleViewSchema", dump_only = True, allow_none = True)

# For getting user info
class UserGetSchema(PlainUserSchema):
    linked_socials = fields.List(
        fields.Nested(LinkedSocialViewSchema),
        dump_only = True
    )

class PlainLinkedSocialSchema(Schema):
    # One linked account (safe fields only)
    id = fields.Int(dump_only=True)
    account_name = fields.Str(required = True)
    platform = fields.Str(
        required = True,
        validate = validate.OneOf(["meta", "google"])
    )
    # Input JSON data
    data = fields.Raw(requried = True)


# --- Specific Meta metrics ---


# --- All Meta metrics ---

    