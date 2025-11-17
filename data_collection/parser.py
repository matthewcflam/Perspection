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
        
        self.followers: set[str] = set()
        self.following: set[str] = set()
        self.close_friends: set[str] = set()
        
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
        