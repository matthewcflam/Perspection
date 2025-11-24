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
    id = fields.Int(dump_only = True)
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
    # Input JSON data (never output)
    data = fields.Raw(required = True, load_only = True)

# --- Generally relevant Meta metrics ---
class PlainMetaSchema(Schema):
    id = fields.Int(dump_only = True)

    name = fields.Str(required = True, validate = validate.Length(max = 100))
    followers_count = fields.Int(dump_only = True)
    following_count = fields.Int(dump_only = True)

# --- Specific Meta metrics ---
class MetaTopFiveReceivedSchema(Schema):
    id = fields.Int(dump_only = True)

    username = fields.Str(dump_only = True)

class MetaTopFiveSenderSchema(Schema):
    id = fields.Int(dump_only = True)

    username = fields.Str(dump_only = True)

class MetaNotFollowingBackSchema(Schema):
    id = fields.Int(dump_only = True)

    username = fields.Str(dump_only = True)

class MetaLikedSchema(Schema):
    id = fields.Int(dump_only = True)

    liked_name = fields.Str(dump_only = True)
    number_likes = fields.Int(dump_only = True)

class MetaMessagesSchema(Schema):
    id = fields.Int(dump_only = True)

    username = fields.Str(dump_only = True)
    messages = fields.List(fields.Str(), dump_only = True)

# --- Master Meta view schema ---

class MetaViewSchema(PlainMetaSchema):
    not_following_back = fields.List(
        fields.Nested("MetaNotFollowingBackSchema"),
        dump_only=True
    )

    liked = fields.List(
        fields.Nested("MetaLikedSchema"),
        dump_only=True
    )

    top_five_receiver = fields.List(
        fields.Nested("MetaTopFiveReceivedSchema"),
        dump_only=True
    )

    top_five_sender = fields.List(
        fields.Nested("MetaTopFiveSenderSchema"),
        dump_only=True
    )


# Google specific
class GoogleViewSchema(Schema):
    id = fields.Integer(dump_only=True)

    name = fields.String()