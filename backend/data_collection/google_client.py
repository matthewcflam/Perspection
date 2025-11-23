# data_collection/google_client.py
from __future__ import annotations

from pathlib import Path
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request


DEFAULT_SCOPES = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/drive.metadata.readonly",
]

class GoogleClient:
    
    def __init__(
        self,
        creds_path="credentials.json",
        token_path="token.json",
        scopes=None,
    ):
        self.creds_path = Path(creds_path)
        self.token_path = Path(token_path)
        self.scopes = scopes or DEFAULT_SCOPES

        self._creds = None
        self._ensure_creds()

        self.drive = DriveClient(self)
        self.youtube = YouTubeClient(self)
        self.gmail = GmailClient(self)

    def _ensure_creds(self):

        if self.token_path.exists():
            self._creds = Credentials.from_authorized_user_file(
                str(self.token_path),
                self.scopes,
            )

        if not self._creds or not self._creds.valid:
            if self._creds and self._creds.expired and self._creds.refresh_token:
                self._creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    str(self.creds_path),
                    self.scopes,
                )
                self._creds = flow.run_local_server(port=0)

            self.token_path.write_text(self._creds.to_json(), encoding="utf-8")
            print("Saved token.json")

    @property
    def creds(self):
        return self._creds
    
class DriveClient:
    def __init__(self, parent: GoogleClient):
        self.parent = parent
        self._service = None

    @property
    def service(self):
        if not self._service:
            self._service = build("drive", "v3", credentials=self.parent.creds)
        return self._service

    def list_files(self, limit=5):
        """Return basic metadata of Drive files."""
        result = self.service.files().list(
            pageSize=limit,
            fields="files(id, name)",
        ).execute()

        return result.get("files", [])

class YouTubeClient:
    def __init__(self, parent: GoogleClient):
        self.parent = parent
        self._service = None

    @property
    def service(self):
        if not self._service:
            self._service = build("youtube", "v3", credentials=self.parent.creds)
        return self._service

    #params:  starting and ending range (written in written in ISO 8601 format)
    #params: how much items you are retrieving per call (max = 50)
    # returns: a list of the accounts you subscribed to within the input time range 
    def list_subscriptions_in_range(self, start_date: str, end_date: str, limit: int = 50):
        try:
            response = self.service.subscriptions().list(
                part="snippet",
                mine=True,
                maxResults=min(limit, 50),
            ).execute()
        except Exception as e:
            print(f"⚠️ API error: {e}")
            return []

        channel_ids = []
        channel_titles = []
        
        for item in response.get("items", []):
            snippet = item.get("snippet", {})
            published_at = snippet.get("publishedAt", "")
            
            # Check if subscription falls within the date range
            if start_date <= published_at <= end_date:
                channel_id = snippet.get("resourceId", {}).get("channelId")
                channel_title = snippet.get("title", "")
                
                if channel_id:
                    channel_ids.append(channel_id)
                    channel_titles.append(channel_title)

        if channel_titles:
            return channel_titles
            
        if not channel_ids:
            return []

        try:
            channels_response = self.service.channels().list(
                part="snippet",
                id=",".join(channel_ids[:50]),
            ).execute()

            return [
                item["snippet"]["title"]
                for item in channels_response.get("items", [])
            ]
        except Exception as e:
            print(f"⚠️ Failed to resolve channel names: {e}")
            return [f"[Channel ID: {cid}]" for cid in channel_ids]
   
    #params: starting and ending range (written in ISO 8601 format)
    #params: how many items you are retrieving per call (max = 50)
    # returns: a list of dictionaries containing liked video information within the input time range
    #          each dictionary contains:
    #          - video_id: the YouTube video ID
    #          - title: the video title
    #          - liked_at: when the video was liked (in ISO 8601 format)
    def get_user_liked_videos_in_range(self, start_date: str, end_date: str, limit: int = 50):
        """
        Retrieves liked videos by the authenticated user within a date range, up to a specified limit.
        """
        liked_videos = []
        next_page_token = None
        
        try:
            # Step 1: Get the user's "Liked Videos" playlist ID
            channels_response = self.service.channels().list(
                part="contentDetails",
                mine=True
            ).execute()
            
            if not channels_response.get("items"):
                return {"count": 0, "videos": []}
                
            liked_videos_playlist_id = channels_response["items"][0]["contentDetails"]["relatedPlaylists"]["likes"]


            while len(liked_videos) < limit:
                playlist_items_response = self.service.playlistItems().list(
                    part="snippet",
                    playlistId=liked_videos_playlist_id,
                    maxResults=50,
                    pageToken=next_page_token
                ).execute()
                
                for item in playlist_items_response.get("items", []):
                    snippet = item.get("snippet", {})
                    published_at = snippet.get("publishedAt")
                    
                    if start_date <= published_at <= end_date:
                        video_id = snippet.get("resourceId", {}).get("videoId")
                        if video_id:
                            liked_videos.append({
                                "video_id": video_id,
                                "title": snippet.get("title", "Title not found"),
                                "liked_at": published_at
                            })
                            if len(liked_videos) >= limit:
                                break
                
                next_page_token = playlist_items_response.get("nextPageToken")
                if not next_page_token:
                    break # No more pages to fetch

            if liked_videos:
                video_ids_to_fetch = [v["video_id"] for v in liked_videos]
                video_details_map = {}
                
                for i in range(0, len(video_ids_to_fetch), 50):
                    batch_ids = video_ids_to_fetch[i:i+50]
                    videos_response = self.service.videos().list(
                        part="snippet",
                        id=",".join(batch_ids)
                    ).execute()
                    
                    for video in videos_response.get("items", []):
                        video_details_map[video["id"]] = video["snippet"]
                
                for video in liked_videos:
                    details = video_details_map.get(video["video_id"])
                    if details:
                        video["channel_id"] = details["channelId"]
                        video["channel_title"] = details["channelTitle"]

        except Exception as e:
            print(f"⚠️ Error fetching liked videos: {e}")
            return {"count": 0, "videos": []}
        
        return {
            "count": len(liked_videos),
            "videos": liked_videos
        }
    #starting and ending date written in ISO 8601 format
    #return: the most liked channels within a time frame
    def get_most_liked_creators(self, start_date: str, end_date: str):
        # First, get all liked videos in the range using our other function
        
        liked_data = self.get_user_liked_videos_in_range(start_date, end_date)
        

        liked_videos = liked_data.get("videos", [])

        if not liked_videos:
            return []

        # Use a dictionary to count likes per channel
        creator_like_counts = {}
        for video in liked_videos:
            channel_id = video.get("channel_id")
            channel_title = video.get("channel_title")
            print(channel_title)

            if channel_id and channel_title:
                if channel_id not in creator_like_counts:
                    creator_like_counts[channel_id] = {
                        "name": channel_title,
                        "liked_count": 1
                    }
                else:
                    creator_like_counts[channel_id]["liked_count"] += 1

        # Sort the creators by liked_count in descending order
        sorted_creators = sorted(
            creator_like_counts.values(),
            key=lambda creator: creator["liked_count"],
            reverse=True
        )
        return sorted_creators



        

class GmailClient:
    def __init__(self, parent: GoogleClient):
        self.parent = parent
        self._service = None

    @property
    def service(self):
        if not self._service:
            self._service = build("gmail", "v1", credentials=self.parent.creds)
        return self._service

    def list_inbox(self, limit=5):
        msgs = self.service.users().messages().list(
            userId="me",
            labelIds=["INBOX"],
            maxResults=limit,
        ).execute()

        out = []

        for msg in msgs.get("messages", []):
            detail = self.service.users().messages().get(
                userId="me",
                id=msg["id"],
                format="metadata",
                metadataHeaders=["Subject", "From"],
            ).execute()

            headers = {
                h["name"]: h["value"]
                for h in detail["payload"]["headers"]
            }
            out.append(
                {
                    "id": msg["id"],
                    "subject": headers.get("Subject", "(no subject)"),
                    "from": headers.get("From", "(no sender)"),
                }
            )

        return out
