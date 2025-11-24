import json
from pathlib import Path
from collections import Counter
from datetime import date, datetime, timedelta

class InstagramParser:
    def __init__(self, export_root: str):
        self.export_root = Path(export_root)

        # === Messages-related ===
        self.messages_path = (
            self.export_root
            / "your_instagram_activity"
            / "messages"
            / "inbox"
        )

        # username used in message stats
        raw_username = self._extract_personal_name()
        self.username = self._decode_name(raw_username)

        self.messages: list[dict] = []
        self.total_msg_sent = 0
        self.top_recievers = {}
        self.top_users = {}
        self.dm_dates_by_other = {}
        self.after_midnight_times = []
        self.late_msg_by_user = {}
        self.total_reels_sent = 0
        self.recent_messages: dict[str, list[str]] = {}

        # === Activity-related ===
        self.liked_posts_path = (
            self.export_root
            / "your_instagram_activity"
            / "likes"
            / "liked_posts.json"
        )

        self.liked_stories_path = (
            self.export_root
            / "your_instagram_activity"
            / "story_interactions"
            / "story_likes.json"
        )

        self.liked_posts: list[dict] = []
        self.liked_stories: list[str] = []

        # === Connections-related ===
        self.followers_path = (
            self.export_root
            / "connections"
            / "followers_and_following"
            / "followers_1.json"
        )

        self.following_path = (
            self.export_root
            / "connections"
            / "followers_and_following"
            / "following.json"
        )

        self.close_friends_path = (
            self.export_root
            / "connections"
            / "followers_and_following"
            / "close_friends.json"
        )

        self.follow_requests_path = (
            self.export_root
            / "connections"
            / "followers_and_following"
            / "recent_follow_requests.json"
        )

        self.unfollowed_path = (
            self.export_root
            / "connections"
            / "followers_and_following"
            / "recently_unfollowed_profiles.json"
        )

        self.followers: set[str] = set()
        self.following: set[str] = set()
        self.close_friends: set[str] = set()
        self.follow_requests: set[str] = set()
        self.unfollowed: set[str] = set()

    # ==========================================================
    # Shared helper methods (from original InstagramParser base)
    # ==========================================================

    @staticmethod
    def _extract_username_value(item: dict) -> str | None:
        sld = item.get("string_list_data")
        if not sld:
            return None
        first = sld[0]
        return first.get("value")

    @staticmethod
    def _extract_username_title(item: dict) -> str | None:
        sld = item.get("title")
        if not sld:
            return None
        return sld

    def _extract_personal_name(self) -> str | None:
        name_path = (
            self.export_root
            / "personal_information"
            / "personal_information"
            / "personal_information.json"
        )

        if not name_path.exists():
            raise ValueError(f"File not found {name_path}")

        with name_path.open("r", encoding="utf-8") as f:
            data = json.load(f)

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

    # ==========================================================
    # Messages-related methods (from InstagramMessagesParser)
    # ==========================================================

    def load_all_messages(self):
        all_messages = []
        total_sent = 0
        top_msg_by_user = {}
        top_msg_users = {}
        dm_dates_by_other = {}
        after_midnight_times = []
        late_msg_by_user = {}
        total_reels_sent = 0
        messages_by_other: dict[str, list[tuple[int, str]]] = {}

        if not self.messages_path.exists():
            raise FileNotFoundError(f"File not found: {self.messages_path}")

        for thread_dir in self.messages_path.iterdir():
            if not thread_dir.is_dir():
                continue

            for msg_file in sorted(thread_dir.glob("message_*.json")):
                with msg_file.open("r", encoding="utf-8") as f:
                    data = json.load(f)

                raw_participants = []
                for p in data.get("participants", []):
                    raw_participants.append(p.get("name", ""))

                participants = [self._decode_name(name) for name in raw_participants]
                title = data.get("title", thread_dir.name)

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

                    if len(participants) == 2 and self.username in participants:
                        others = [p for p in participants if p != self.username]
                        if not others:
                            continue

                        other = others[0]

                        if sender == self.username:
                            total_sent += 1
                            top_msg_by_user[other] = top_msg_by_user.get(other, 0) + 1

                            if timestamp_ms:
                                day = datetime.fromtimestamp(timestamp_ms / 1000).date()
                                top_dates = dm_dates_by_other.setdefault(other, set())
                                top_dates.add(day)

                                dt = datetime.fromtimestamp(timestamp_ms / 1000)
                                if 0 <= dt.hour < 5:
                                    after_midnight_times.append(dt)
                                    late_msg_by_user.setdefault(other, []).append(dt)
                                    
                    if isinstance(content, str) and isinstance(timestamp_ms, int) and len(participants) == 2:
                            bucket = messages_by_other.setdefault(other, [])
                            bucket.append((timestamp_ms, content))

                    if sender != self.username and sender and len(participants) == 2:
                        top_msg_users[sender] = top_msg_users.get(sender, 0) + 1

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
                        
        recent_messages: dict[str, list[str]] = {}

        NUM_USERS = 10
        NUM_MSGS_PER_USER = 5

        last_ts_by_other: dict[str, int] = {}
        for other, items in messages_by_other.items():
            last_ts_by_other[other] = max(ts for ts, _ in items)

        # Sort users by recency of that last message (newest first)
        sorted_others = sorted(
            last_ts_by_other.items(),
            key=lambda kv: kv[1],
            reverse=True,
        )[:NUM_USERS]
        
        for other, _ in sorted_others:
            items = messages_by_other[other]
            # sort that conversation newest -> oldest
            items.sort(key=lambda x: x[0], reverse=True)
            # keep the top 5 contents
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

    # Message Statistics (same names)

    def get_total_msg_sent(self) -> int:
        return self.total_msg_sent

    def get_top_5_user_recievers(self) -> list[tuple[str, int]]:
        return Counter(self.top_recievers).most_common(5)

    def get_top_5_user_msg(self) -> list[tuple[str, int]]:
        return Counter(self.top_users).most_common(5)

    def get_dm_streaks(self) -> dict:
        streaks = {}

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

    def _compute_time_from_timestamps(self, timestamps: list) -> int:
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
        results = []

        for user, timestamps in self.late_msg_by_user.items():
            total_seconds = self._compute_time_from_timestamps(timestamps)
            td = timedelta(seconds=total_seconds)
            results.append((user, str(td)))

        results.sort(
            key=lambda x: sum(
                int(t) * 60**i for i, t in enumerate(reversed(x[1].split(":")))
            ),
            reverse=True,
        )

        return results[:5]

    def get_total_reels_sent(self) -> int:
        return self.total_reels_sent

    # ==========================================================
    # Activity-related methods (from InstagramActivityParser)
    # ==========================================================

    def load_liked_posts(self) -> None:
        if not self.liked_posts_path.exists():
            raise FileNotFoundError(f"File not found: {self.liked_posts_path}")

        with self.liked_posts_path.open("r", encoding="utf-8") as f:
            data = json.load(f)

        liked_posts = []

        items = data.get("likes_media_likes")
        if not isinstance(items, list):
            raise ValueError("Unexpected format in json file")

        for item in items:
            username = self._extract_username_title(item)

            sld = item.get("string_list_data") or []
            if not sld:
                continue

            first = sld[0]
            url = first.get("href")
            ts = first.get("timestamp")

            liked_posts.append({
                "username": username,
                "url": url,
                "timestamp": ts,
            })

        self.liked_posts = liked_posts

    def load_liked_stories(self) -> None:
        if not self.liked_stories_path.exists():
            raise FileNotFoundError(f"File not found: {self.liked_stories_path}")

        with self.liked_stories_path.open("r", encoding="utf-8") as f:
            data = json.load(f)

        items = data.get("story_activities_story_likes")
        if not isinstance(items, list):
            raise ValueError("Unexpected format in json file")

        liked_stories: list[str] = []
        for item in items:
            username = self._extract_username_title(item)
            if username:
                liked_stories.append(username)

        self.liked_stories = liked_stories

    # Activity Statistics (same names)

    def get_total_liked_posts(self) -> int:
        return len(self.liked_posts)

    def get_top_5_users(self) -> list[tuple[str, int]]:
        counter = Counter(post["username"] for post in self.liked_posts)
        return counter.most_common(5)

    def get_total_liked_stories(self) -> int:
        return len(self.liked_stories)

    # ==========================================================
    # Connections-related methods (from InstagramConnectionsParser)
    # ==========================================================

    def load_followers(self) -> None:
        if not self.followers_path.exists():
            raise FileNotFoundError(f"File not found: {self.followers_path}")

        with self.followers_path.open("r", encoding="utf-8") as f:
            data = json.load(f)

        followers: set[str] = set()

        if isinstance(data, list):
            for item in data:
                username = self._extract_username_value(item)
                if username:
                    followers.add(username)

        self.followers = followers

    def load_following(self) -> None:
        if not self.following_path.exists():
            raise ValueError(f"File not found {self.following_path}")

        with self.following_path.open("r", encoding="utf-8") as f:
            data = json.load(f)

        following: set[str] = set()
        items = data.get("relationships_following")

        if not isinstance(items, list):
            raise ValueError("Unexpected format in json file")

        for item in items:
            username = self._extract_username_title(item)
            if username:
                following.add(username)

        self.following = following

    def load_close_friends(self) -> None:
        if not self.close_friends_path.exists():
            raise ValueError(f"File not found {self.close_friends_path}")

        with self.close_friends_path.open("r", encoding="utf-8") as f:
            data = json.load(f)

        close_friends: set[str] = set()
        items = data.get("relationships_close_friends")

        if not isinstance(items, list):
            raise ValueError("Unexpected format in json file")

        for item in items:
            username = self._extract_username_value(item)
            if username:
                close_friends.add(username)

        self.close_friends = close_friends

    def load_follow_requests(self) -> None:
        if not self.follow_requests_path.exists():
            raise ValueError(f"File not found {self.follow_requests_path}")

        with self.follow_requests_path.open("r", encoding="utf-8") as f:
            data = json.load(f)

        follow_requests: set[str] = set()
        items = data.get("relationships_permanent_follow_requests")

        if not isinstance(items, list):
            raise ValueError("Unexpected format in json file")

        for item in items:
            username = self._extract_username_value(item)
            if username:
                follow_requests.add(username)

        self.follow_requests = follow_requests

    def load_unfollowed(self) -> None:
        if not self.unfollowed_path.exists():
            raise ValueError(f"File not found {self.unfollowed_path}")

        with self.unfollowed_path.open("r", encoding="utf-8") as f:
            data = json.load(f)

        unfollowed: set[str] = set()
        items = data.get("relationships_unfollowed_users")

        if not isinstance(items, list):
            raise ValueError("Unexpected format in json file")

        for item in items:
            username = self._extract_username_value(item)
            if username:
                unfollowed.add(username)

        self.unfollowed = unfollowed

    def load_followers_and_following(self) -> None:
        self.load_followers()
        self.load_following()

    # Comparison methods
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
    
    def get_close_friends(self) -> int:
        return len(self.close_friends)
    
    def get_only_following(self) -> set[str]:

        SHOW_N = 5

        if not self.following - self.followers:
            return set()

        return set(list(sorted(self.following - self.followers))[:SHOW_N])

    def get_recent_messages(self) -> dict[str, list[str]]:
        return self.recent_messages