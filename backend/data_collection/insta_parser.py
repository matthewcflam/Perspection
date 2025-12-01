import json
from collections import Counter
from datetime import date, datetime, timedelta
from typing import Any


class InstagramParser:
    def __init__(self, json_list: list[Any]):
        """
        json_list: list that are the CONTENTS of the JSON files, e.g.
            [
                {...},  # following.json contents
                [...],  # followers_1.json contents
                {...},  # liked_posts.json contents
                {...},  # messages.json contents
                ...
            ]
        We infer which is which and build an internal filemap dict
        so the rest of the code can keep using filename keys:
            - "personal_information.json"
            - "followers_1.json"
            - "following.json"
            - "liked_posts.json"
            - "story_likes.json"
            - "recent_follow_requests.json"
            - "recently_unfollowed_profiles.json"
            - "close_friends.json"
            - "messages.json" or "message_1.json", "message_2.json", ...
        """
        if not isinstance(json_list, list):
            raise ValueError("json_list must be a list[Any]")

        # Build the internal filename -> JSON object map from the raw contents
        self.filemap: dict[str, Any] = self._build_filemap_from_list(json_list)

        # username used in message stats
        raw_username = self._extract_personal_name()
        self.username = self._decode_name(raw_username)

        # === Messages-related ===
        self.messages: list[dict] = []
        self.total_msg_sent = 0
        self.top_recievers: dict[str, int] = {}
        self.top_users: dict[str, int] = {}
        self.dm_dates_by_other: dict[str, set[date]] = {}
        self.after_midnight_times: list[datetime] = []
        self.late_msg_by_user: dict[str, list[datetime]] = {}
        self.total_reels_sent = 0
        self.recent_messages: dict[str, list[str]] = {}

        # === Activity-related ===
        self.liked_posts: list[dict] = []
        self.liked_stories: list[str] = []

        # === Connections-related ===
        self.followers: set[str] = set()
        self.following: set[str] = set()
        # self.close_friends: set[str] = set()
        self.follow_requests: set[str] = set()
        self.unfollowed: set[str] = set()

    # --------------------------------------------------
    # Adapter: build filemap from list-of-JSON-objects
    # --------------------------------------------------
    def _build_filemap_from_list(self, json_list: list[Any]) -> dict[str, Any]:
        """
        Turn a list of JSON contents into an internal dict that looks like:
            {
                "following.json": {...},
                "followers_1.json": [...],
                "liked_posts.json": {...},
                "story_likes.json": {...},
                "recent_follow_requests.json": {...},
                "recently_unfollowed_profiles.json": {...},
                "close_friends.json": {...},
                "message_1.json": {...},
                "message_2.json": {...},
                ...
            }
        based purely on the CONTENTS (their keys/shape).
        """
        filemap: dict[str, Any] = {}
        msg_idx = 1  # for synthetic message_1.json, message_2.json, ...

        for obj in json_list:
            if not isinstance(obj, (dict, list)):
                continue

            # ---- Dict-shaped JSONs ----
            if isinstance(obj, dict):
                # following.json
                if "relationships_following" in obj:
                    filemap.setdefault("following.json", obj)
                    continue

                # liked_posts.json
                if "likes_media_likes" in obj:
                    filemap.setdefault("liked_posts.json", obj)
                    continue

                # story_likes.json
                if "story_activities_story_likes" in obj:
                    filemap.setdefault("story_likes.json", obj)
                    continue

                # recent_follow_requests.json
                if "relationships_permanent_follow_requests" in obj:
                    filemap.setdefault("recent_follow_requests.json", obj)
                    continue

                # recently_unfollowed_profiles.json
                if "relationships_unfollowed_users" in obj:
                    filemap.setdefault("recently_unfollowed_profiles.json", obj)
                    continue

                # close_friends.json (if you re-enable that loader later)
                if "relationships_close_friends" in obj:
                    filemap.setdefault("close_friends.json", obj)
                    continue

                # personal_information.json (profile_user with string_map_data)
                if "profile_user" in obj:
                    pu = obj.get("profile_user")
                    if isinstance(pu, list) and pu and isinstance(pu[0], dict):
                        if "string_map_data" in pu[0]:
                            filemap.setdefault("personal_information.json", obj)
                            continue

                # messages thread: has "messages" and "participants"
                if "messages" in obj and "participants" in obj:
                    fname = f"message_{msg_idx}.json"
                    msg_idx += 1
                    filemap[fname] = obj
                    continue

            # ---- List-shaped JSONs (followers_1.json) ----
            if isinstance(obj, list):
                # We assume followers_1.json is a list whose items have "string_list_data"
                if obj and isinstance(obj[0], dict) and "string_list_data" in obj[0]:
                    filemap.setdefault("followers_1.json", obj)
                    continue

        return filemap

    # --------------------------------------------------
    # Shared helper methods
    # --------------------------------------------------
    def _get_file(self, filename: str) -> Any:
        """
        Return the parsed JSON object for the given filename key.
        Raises FileNotFoundError if missing.
        """
        if filename not in self.filemap:
            raise FileNotFoundError(f"{filename} not found in filemap")
        return self.filemap[filename]

    @staticmethod
    def _extract_username_value(item: dict) -> str | None:
        sld = item.get("string_list_data")
        if not sld:
            return None
        first = sld[0]
        return first.get("value")

    @staticmethod
    def _extract_username_title(item: dict) -> str | None:
        title = item.get("title")
        if not title:
            return None
        return title

    def _extract_personal_name(self) -> str | None:
        """
        Try to extract the profile name from 'personal_information.json'
        if present in filemap. If missing or badly formatted, just return None.
        """
        filename_candidates = [
            "personal_information.json",
            # If you ever decide to keep the original relative path as key
            "personal_information/personal_information/personal_information.json",
        ]

        data = None
        for fname in filename_candidates:
            if fname in self.filemap:
                data = self.filemap[fname]
                break

        if data is None:
            # No personal info file – fine, username will be None
            return None

        profile_user = data.get("profile_user")
        if not isinstance(profile_user, list) or not profile_user:
            return None

        string_map_data = profile_user[0].get("string_map_data")
        name_entry = string_map_data.get("Name") if string_map_data else None
        if not name_entry:
            return None

        name = name_entry.get("value")
        return name or None

    def _decode_name(self, s: str | None) -> str | None:
        if not s:
            return s
        try:
            return s.encode("latin1").decode("utf-8")
        except UnicodeDecodeError:
            return s

    def _ts_to_date(self, ts_ms: int) -> date:
        return datetime.fromtimestamp(ts_ms / 1000).date()

    # --------------------------------------------------
    # Messages-related methods
    # --------------------------------------------------
    def _iter_message_threads(self):
        """
        Yield (thread_name, data_dict) for each messages file in filemap.

        We treat keys that:
            - start with "message_" and end with ".json", OR
            - equal "messages.json"
        as thread JSONs with the standard Instagram export format.
        """
        for filename, data in self.filemap.items():
            if not filename.endswith(".json"):
                continue
            if filename == "messages.json" or filename.startswith("message_"):
                # title inside JSON takes precedence; fallback to filename
                title = data.get("title") or filename
                yield title, data

    def load_all_messages(self) -> None:
        all_messages = []
        total_sent = 0
        top_msg_by_user: dict[str, int] = {}
        top_msg_users: dict[str, int] = {}
        dm_dates_by_other: dict[str, set[date]] = {}
        after_midnight_times: list[datetime] = []
        late_msg_by_user: dict[str, list[datetime]] = {}
        total_reels_sent = 0
        messages_by_other: dict[str, list[tuple[int, str]]] = {}

        for thread_title, data in self._iter_message_threads():
            # participants
            raw_participants = [
                p.get("name", "") for p in data.get("participants", [])
            ]
            participants = [self._decode_name(name) for name in raw_participants]
            title = data.get("title", thread_title)

            for m in data.get("messages", []):
                raw_sender = m.get("sender_name")
                sender = self._decode_name(raw_sender)
                content = m.get("content")
                timestamp_ms = m.get("timestamp_ms")
                share = m.get("share")

                info = {
                    "thread": title,
                    "participants": participants,
                    "sender": sender,
                    "content": content,
                    "timestamp_ms": timestamp_ms,
                    "share": share,
                }
                all_messages.append(info)

                # Only meaningful for 1:1 DMs where we are a participant
                if len(participants) == 2 and self.username in participants:
                    others = [p for p in participants if p != self.username]
                    if not others:
                        continue

                    other = others[0]

                    # Messages we sent
                    if sender == self.username:
                        total_sent += 1
                        top_msg_by_user[other] = top_msg_by_user.get(other, 0) + 1

                        if isinstance(timestamp_ms, int):
                            dt = datetime.fromtimestamp(timestamp_ms / 1000)
                            day = dt.date()
                            top_dates = dm_dates_by_other.setdefault(other, set())
                            top_dates.add(day)

                            if 0 <= dt.hour < 5:
                                after_midnight_times.append(dt)
                                late_msg_by_user.setdefault(other, []).append(dt)

                        # For recent messages content by other
                        if (
                            isinstance(content, str)
                            and isinstance(timestamp_ms, int)
                        ):
                            bucket = messages_by_other.setdefault(other, [])
                            bucket.append((timestamp_ms, content))

                    # Messages we received
                    if sender != self.username and sender and len(participants) == 2:
                        top_msg_users[sender] = top_msg_users.get(sender, 0) + 1

                # Reel detection
                is_reel = False
                if isinstance(share, dict):
                    link = share.get("link") or ""
                    if "instagram.com/reel" in link:
                        is_reel = True

                if not is_reel and isinstance(content, str):
                    if "instagram.com/reel" in content:
                        is_reel = True

                if sender == self.username and is_reel:
                    total_reels_sent += 1

        # Build recent messages by most recent timestamp per user
        recent_messages: dict[str, list[str]] = {}

        NUM_USERS = 10
        NUM_MSGS_PER_USER = 5

        last_ts_by_other: dict[str, int] = {}
        for other, items in messages_by_other.items():
            last_ts_by_other[other] = max(ts for ts, _ in items)

        sorted_others = sorted(
            last_ts_by_other.items(),
            key=lambda kv: kv[1],
            reverse=True,
        )[:NUM_USERS]

        for other, _ in sorted_others:
            items = messages_by_other[other]
            # newest → oldest
            items.sort(key=lambda x: x[0], reverse=True)
            recent_messages[other] = [content for _, content in items[:NUM_MSGS_PER_USER]]

        self.messages = all_messages
        self.total_msg_sent = total_sent
        self.top_recievers = top_msg_by_user
        self.top_users = top_msg_users
        self.dm_dates_by_other = dm_dates_by_other
        self.after_midnight_times = after_midnight_times
        self.late_msg_by_user = late_msg_by_user
        self.total_reels_sent = total_reels_sent
        self.recent_messages = recent_messages

    # Message statistics
    def get_total_msg_sent(self) -> int:
        return self.total_msg_sent

    def get_top_5_user_recievers(self) -> list[tuple[str, int]]:
        return Counter(self.top_recievers).most_common(5)

    def get_top_5_user_msg(self) -> list[tuple[str, int]]:
        return Counter(self.top_users).most_common(5)

    def get_dm_streaks(self) -> dict[str, int]:
        streaks: dict[str, int] = {}

        for other, dates in self.dm_dates_by_other.items():
            if not dates:
                streaks[other] = 0
                continue

            days = sorted(dates)
            current = 1
            best = 1

            for prev, cur in zip(days, days[1:]):
                if (cur - prev).days == 1:
                    current += 1
                else:
                    best = max(best, current)
                    current = 1

            best = max(best, current)
            streaks[other] = best

        return streaks

    def get_top_3_dm_streaks(self) -> list[tuple[str, int]]:
        streaks = self.get_dm_streaks()
        return Counter(streaks).most_common(3)

    def get_after_midnight_sent(self) -> str:
        times = self.after_midnight_times
        if len(times) < 2:
            return "00:00:00"

        times = sorted(times)

        total = 0
        THRESHOLD = 3 * 60

        prev = times[0]
        for cur in times[1:]:
            gap = (cur - prev).total_seconds()
            if 0 < gap <= THRESHOLD:
                total += gap
            prev = cur

        td = timedelta(seconds=int(total))
        return str(td)

    def _compute_time_from_timestamps(self, timestamps: list[datetime]) -> int:
        if len(timestamps) < 2:
            return 0

        timestamps = sorted(timestamps)
        total = 0
        THRESHOLD = 3 * 60

        prev = timestamps[0]
        for cur in timestamps[1:]:
            gap = (cur - prev).total_seconds()
            if 0 < gap <= THRESHOLD:
                total += gap
            prev = cur

        return int(total)

    def get_top_5_user_late_msg(self) -> list[tuple[str, str]]:
        results: list[tuple[str, str]] = []

        for user, timestamps in self.late_msg_by_user.items():
            total_seconds = self._compute_time_from_timestamps(timestamps)
            td = timedelta(seconds=total_seconds)
            results.append((user, str(td)))

        # Sort descending by total time string interpreted as HH:MM:SS
        def _time_to_seconds(time_str: str) -> int:
            parts = [int(p) for p in time_str.split(":")]
            while len(parts) < 3:
                parts.insert(0, 0)
            h, m, s = parts
            return h * 3600 + m * 60 + s

        results.sort(key=lambda x: _time_to_seconds(x[1]), reverse=True)
        return results[:5]

    def get_total_reels_sent(self) -> int:
        return self.total_reels_sent

    def get_recent_messages(self) -> dict[str, list[str]]:
        return self.recent_messages

    # --------------------------------------------------
    # Activity-related methods
    # --------------------------------------------------
    def load_liked_posts(self) -> None:
        data = self._get_file("liked_posts.json")

        liked_posts: list[dict] = []

        items = data.get("likes_media_likes")
        if not isinstance(items, list):
            raise ValueError("Unexpected format in liked_posts.json")

        for item in items:
            username = self._extract_username_title(item)

            sld = item.get("string_list_data") or []
            if not sld:
                continue

            first = sld[0]
            url = first.get("href")
            ts = first.get("timestamp")

            liked_posts.append(
                {
                    "username": username,
                    "url": url,
                    "timestamp": ts,
                }
            )

        self.liked_posts = liked_posts

    def load_liked_stories(self) -> None:
        data = self._get_file("story_likes.json")

        items = data.get("story_activities_story_likes")
        if not isinstance(items, list):
            raise ValueError("Unexpected format in story_likes.json")

        liked_stories: list[str] = []
        for item in items:
            username = self._extract_username_title(item)
            if username:
                liked_stories.append(username)

        self.liked_stories = liked_stories

    # Activity statistics
    def get_total_liked_posts(self) -> int:
        return len(self.liked_posts)

    def get_top_5_users(self) -> list[tuple[str, int]]:
        counter = Counter(post["username"] for post in self.liked_posts)
        return counter.most_common(5)

    def get_total_liked_stories(self) -> int:
        return len(self.liked_stories)

    # --------------------------------------------------
    # Connections-related methods
    # --------------------------------------------------
    def load_followers(self) -> None:
        data = self._get_file("followers_1.json")

        followers: set[str] = set()

        if isinstance(data, list):
            for item in data:
                username = self._extract_username_value(item)
                if username:
                    followers.add(username)
        else:
            raise ValueError("followers_1.json must be a list")

        self.followers = followers

    def load_following(self) -> None:
        data = self._get_file("following.json")

        following: set[str] = set()
        items = data.get("relationships_following")

        if not isinstance(items, list):
            raise ValueError("Unexpected format in following.json")

        for item in items:
            username = self._extract_username_title(item)
            if username:
                following.add(username)

        self.following = following

    # def load_close_friends(self) -> None:
    #     data = self._get_file("close_friends.json")
    #
    #     close_friends: set[str] = set()
    #     items = data.get("relationships_close_friends")
    #
    #     if not isinstance(items, list):
    #         raise ValueError("Unexpected format in close_friends.json")
    #
    #     for item in items:
    #         username = self._extract_username_value(item)
    #         if username:
    #             close_friends.add(username)
    #
    #     self.close_friends = close_friends

    def load_follow_requests(self) -> None:
        data = self._get_file("recent_follow_requests.json")

        follow_requests: set[str] = set()
        items = data.get("relationships_permanent_follow_requests")

        if not isinstance(items, list):
            raise ValueError("Unexpected format in recent_follow_requests.json")

        for item in items:
            username = self._extract_username_value(item)
            if username:
                follow_requests.add(username)

        self.follow_requests = follow_requests

    def load_unfollowed(self) -> None:
        data = self._get_file("recently_unfollowed_profiles.json")

        unfollowed: set[str] = set()
        items = data.get("relationships_unfollowed_users")

        if not isinstance(items, list):
            raise ValueError("Unexpected format in recently_unfollowed_profiles.json")

        for item in items:
            username = self._extract_username_value(item)
            if username:
                unfollowed.add(username)

        self.unfollowed = unfollowed

    def load_followers_and_following(self) -> None:
        self.load_followers()
        self.load_following()

    # Comparison / counts
    def get_follower_count(self) -> int:
        return len(self.followers)

    def get_following_count(self) -> int:
        return len(self.following)

    def get_mutuals(self) -> int:
        return len(self.followers & self.following)

    def get_following_only(self) -> int:
        return len(self.following - self.followers)

    def get_followers_only(self) -> int:
        return len(self.followers - self.following)

    def get_follow_req(self) -> int:
        return len(self.follow_requests)

    def get_unfollowed(self) -> int:
        return len(self.unfollowed)

    # def get_close_friends(self) -> int:
    #     return len(self.close_friends)

    def get_only_following(self) -> set[str]:
        SHOW_N = 5

        diff = self.following - self.followers
        if not diff:
            return set()

        return set(list(sorted(diff))[:SHOW_N])