import json
from pathlib import Path
from collections import Counter

class InstagramParser:
    def __init__(self, export_root: str):
        self.export_root = Path(export_root)
        
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

        name_entry = string_map_data.get("Name")
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

class InstagramMessagesParser(InstagramParser):
    def __init__(self, export_root: str):
        super().__init__(export_root)
        
        self.username = self._extract_personal_name()
        
        self.messages_path = (
            self.export_root 
            / "your_instagram_activity"
            / "messages" 
            / "inbox"
        )
        
        self.messages: list[dict] = []
        self.total_msg_sent = 0
        self.top_users = {}
        
    def load_all_messages(self):
        all_messages = []
        total_sent = 0
        top_msg_users = {}

        if not self.messages_path.exists():
            raise FileNotFoundError(f"File not found: {self.message_path}")

        for thread_dir in self.messages_path.iterdir():
            if not thread_dir.is_dir():
                continue

            for msg_file in sorted(thread_dir.glob("message_*.json")):
                with msg_file.open("r", encoding="utf-8") as f:
                    data = json.load(f)

                participants = []
                for p in data.get("participants", []):
                    participants.append(p.get("name", ""))

                title = data.get("title", thread_dir.name)

                for m in data.get("messages", []):
                    raw_sender = m.get("sender_name")
                    sender = self._decode_name(raw_sender)
                    content = m.get("content")
                    timestamp_ms = m.get("timestamp_ms")
                    
                    info = {
                        "thread": title,
                        "participants": participants,
                        "sender": sender,
                        "content": content,
                        "timestamp_ms": timestamp_ms,
                    }
                    all_messages.append(info)
                    
                    if sender == self.username and len(participants) == 2:
                        total_sent+=1
                        
                    if sender != self.username and sender and len(participants) == 2:
                        top_msg_users[sender] = top_msg_users.get(sender, 0) + 1

        self.messages = all_messages
        self.total_msg_sent = total_sent
        self.top_users = top_msg_users
    
    # Message Statistics
    def get_total_msg_sent(self) -> int:
        return self.total_msg_sent
            
    def get_top_5_user_msg(self) -> list[tuple[str, int]]:
        return Counter(self.top_users).most_common(5)
    
    # def get_bottom_5_users(self):
    #     c = Counter(self.top_users)
    #     return list(reversed(c.most_common()))[:5]
class InstagramActivityParser(InstagramParser):
    
    def __init__(self, export_root: str):
        super().__init__(export_root)
        
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
        
        self.liked_posts: list[str] = []
        self.liked_stories: list[str] = []
        
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
                "timestamp": ts
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
        
        liked_stories: list[str] = list()
        
        for item in items:
            username = self._extract_username_title
            
            if(username):
                liked_stories.append(username)
                
        self.liked_stories = liked_stories

    # Statics Functions
    def get_total_liked_posts(self) -> int:
        return len(self.liked_posts)
    
    def get_top_5_users(self) -> list[tuple[str, int]]:
        counter = Counter(post["username"] for post in self.liked_posts)
        return counter.most_common(5)

    def get_total_liked_stories(self) -> int:
        return len(self.liked_stories)
class InstagramConnectionsParser(InstagramParser):
    
    def __init__(self, export_root: str):
        super().__init__(export_root)
        
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
                else:
                    continue
                
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
            else:
                continue
                
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
            else:
                continue
            
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
            else:
                continue
        
        self.follow_requests = follow_requests
        
    def load_unfollowed(self) -> None:
        if not self.unfollowed_path.exists():
            raise ValueError("File not found {self.unfollowed_path}")
        
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
            else:
                continue
            
        self.unfollowed = unfollowed
            
    def load_followers_and_following(self) -> None:
        self.load_followers()
        self.load_following()
    
    # Comparison methods
    
    def get_mutuals(self) -> set[str]:
        return self.followers & self.following
    
    def get_following_only(self) -> set[str]:
        return self.following - self.followers
    
    def get_followers_only(self) -> set[str]:
        return self.followers - self.following