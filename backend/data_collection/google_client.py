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

    def list_subscriptions(self, limit=5):
        subs = self.service.subscriptions().list(
            part="snippet",
            mine=True,
            maxResults=limit,
        ).execute()

        return [
            item["snippet"]["title"]
            for item in subs.get("items", [])
        ]

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
