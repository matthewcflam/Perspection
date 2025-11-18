import json
from pathlib import Path

class InstagramConnectionsParser:
    
    def __init__(self, export_root: str):
        self.export_root = Path(export_root)
        
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
    
    def load_followers(self) -> None:
        if not self.followers_path.exists():
            raise FileNotFoundError("File not found: {self.followers_path}")
        
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
            raise ValueError("File not found {self.following_path}")
        
        with self.following_path.open("r", encoding="utf-8") as f:
            data = json.load(f)
            
        following: set[str] = set()
        
        items = data.get("relationships_following")
        
        if not isinstance(items, list):
            raise ValueError("Unexpected format in json file")
        
        print(f"DEBUG following.json: {len(items)} entries")
        
        for item in items:
            username = self._extract_username_title(item)
            
            if username:
                following.add(username)
            else:
                continue
                
        self.following = following
        
    def load_close_friends(self) -> None:
        if not self.close_friends_path.exists():
            raise ValueError("File not found {self.close_friends_path}")
        
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
            raise ValueError("File not found {self.follow_requests_path}")
        
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
        