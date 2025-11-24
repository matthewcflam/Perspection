## BACKEND PARSING

The data parsing from Meta (Instagram) and Google is completely different. This will describe how to run/test each independantly.

## Meta(Instagram):

All the data on the instagram parser goes through the parser_insta.py, the main.py is where all the testing is occuring and where to determine which fields we want. To take a specific field (like # of posts liked), the child class the method is under must be imported, then stored, for example, connections = InstagramConnectionsParser(export_root) followed by initializing mutuals = connections.get_mutuals(). This gives the variable connections all the methods in the class given the folder, and now we can get more variables to take this data.

1. Download your Instagram data and go to the folder, if it is zipped, extract the contents.

2. In the terminal, give the file its path, ensure to include quotations ("file").

3. Paste in the folder, you should see in the terminal all the data print.

## Methods used for parsing:

# InstagramParser – Full Function Reference

## 1. Initialization
from instagram_parser import InstagramParser
parser = InstagramParser("/path/to/instagram_export")

## 2. Loader Methods (populate internal state)

### Connections
load_followers() -> None
    populates: self.followers: set[str]

load_following() -> None
    populates: self.following: set[str]

load_close_friends() -> None
    populates: self.close_friends: set[str]

load_follow_requests() -> None
    populates: self.follow_requests: set[str]

load_unfollowed() -> None
    populates: self.unfollowed: set[str]

load_followers_and_following() -> None
    wrapper for load_followers() and load_following()

### Activity (Likes)
load_liked_posts() -> None
    populates: self.liked_posts: list[dict]
        # dict format:
        # {
        #   "username": str | None,
        #   "url": str | None,
        #   "timestamp": int | None
        # }

load_liked_stories() -> None
    populates: self.liked_stories: list[str]

### Messages
load_all_messages() -> None
    populates:
        self.messages: list[dict]
        self.total_msg_sent: int
        self.top_recievers: dict[str, int]
        self.top_users: dict[str, int]
        self.dm_dates_by_other: dict[str, set[date]]
        self.after_midnight_times: list[datetime]
        self.late_msg_by_user: dict[str, list[datetime]]
        self.total_reels_sent: int

    message dict format:
        {
          "thread": str,
          "participants": list[str],
          "sender": str | None,
          "content": str | None,
          "timestamp_ms": int | None,
          "share": dict | None
        }

## 3. Getter Functions — Connections

get_mutuals() -> set[str]
get_following_only() -> set[str]
get_followers_only() -> set[str]

## 4. Getter Functions — Activity (Likes)

get_total_liked_posts() -> int
get_top_5_users() -> list[tuple[str, int]]
get_total_liked_stories() -> int

## 5. Getter Functions — Messages

get_total_msg_sent() -> int
get_top_5_user_recievers() -> list[tuple[str, int]]
get_top_5_user_msg() -> list[tuple[str, int]]

# DM Streaks
get_dm_streaks() -> dict[str, int]
get_top_3_dm_streaks() -> list[tuple[str, int]]

# Late Night Messaging
get_after_midnight_sent() -> str   # "HH:MM:SS"
get_top_5_user_late_msg() -> list[tuple[str, str]]  # (username, "HH:MM:SS")

# Reels
get_total_reels_sent() -> int

## 6. Internal Helper Methods
_extract_personal_name() -> str | None
_decode_name(s: str | None) -> str | None
_ts_to_date(ts_ms: int) -> date
_extract_username_value(item: dict) -> str | None
_extract_username_title(item: dict) -> str | None

## 7. Typical Usage Example

ig = InstagramParser("/export/path")

ig.load_followers_and_following()
ig.load_close_friends()
ig.load_follow_requests()
ig.load_unfollowed()

ig.load_liked_posts()
ig.load_liked_stories()

ig.load_all_messages()

print("Followers:", len(ig.followers))
print("Mutuals:", len(ig.get_mutuals()))
print("Top liked:", ig.get_top_5_users())
print("Messages sent:", ig.get_total_msg_sent())
print("Top receivers:", ig.get_top_5_user_recievers())
print("After midnight:", ig.get_after_midnight_sent())
print("Reels sent:", ig.get_total_reels_sent())

## Google:

To utilize this parsing, many dependencies must be installed first. 

1. Create the Python virtual environment and download the packages from requirements.txt like the SETUP.

2. Once in the virtual environment, run the script, parser_google.py, this is done on MacOS/Linux by using this command in terminal: "./.venv/bin/python3 data_collection/parser_google.py". The command will be different on Windows.

3. Once the script is running, you will be directed to a new webpage, ensure to allow google to access all your data.

4. After this is done, rerun the script using the same command: "./.venv/bin/python3 data_collection/parser_google.py". This will give you the live data for Gmail, Google Drive and YouTube.

Full workflow for gitbash (previous one may be outdated):
1. Create (or ensure) venv
python -m venv .venv

2. Activate it
source .venv/Scripts/activate

3. Install deps
pip install -r backend/requirements.txt

4. Run script
python backend/data_collection/parser_google.py


