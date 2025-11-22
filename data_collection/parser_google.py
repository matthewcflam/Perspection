from pathlib import Path

from google_auth_oauthlib.flow import InstalledAppFlow
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

SCOPES = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/drive.metadata.readonly",
]

CREDS_PATH = Path("credentials.json")       # adjust if you keep it elsewhere
TOKEN_PATH = Path("token.json")


def get_creds() -> Credentials:
    """Load credentials from token.json, or run the browser flow if needed."""
    creds: Credentials | None = None

    if TOKEN_PATH.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_PATH), SCOPES)

    # If no creds or scopes changed, run the auth flow again
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                str(CREDS_PATH), SCOPES
            )
            creds = flow.run_local_server(port=0)
        TOKEN_PATH.write_text(creds.to_json(), encoding="utf-8")
        print("Saved token.json")

    return creds


def test_drive(creds: Credentials) -> None:
    drive = build("drive", "v3", credentials=creds)
    result = drive.files().list(
        pageSize=5,
        fields="files(id, name)",
    ).execute()
    print("Drive files:")
    for f in result.get("files", []):
        print(f" – {f['name']} ({f['id']})")
    print()


def test_youtube(creds: Credentials) -> None:
    yt = build("youtube", "v3", credentials=creds)
    subs = yt.subscriptions().list(
        part="snippet",
        mine=True,
        maxResults=5,
    ).execute()
    print("YouTube subs:")
    for item in subs.get("items", []):
        title = item["snippet"]["title"]
        print(f" – {title}")
    print()


def test_gmail(creds: Credentials) -> None:
    gmail = build("gmail", "v1", credentials=creds)

    # Get 5 most recent messages from INBOX
    msg_list = gmail.users().messages().list(
        userId="me",
        labelIds=["INBOX"],
        maxResults=5,
    ).execute()

    print("Gmail INBOX latest:")
    for msg in msg_list.get("messages", []):
        detail = gmail.users().messages().get(
            userId="me",
            id=msg["id"],
            format="metadata",
            metadataHeaders=["Subject", "From"],
        ).execute()

        headers = {h["name"]: h["value"] for h in detail["payload"]["headers"]}
        subject = headers.get("Subject", "(no subject)")
        sender = headers.get("From", "(no sender)")
        print(f" – {subject}  |  {sender}")
    print()


if __name__ == "__main__":
    creds = get_creds()
    test_drive(creds)
    test_youtube(creds)
    test_gmail(creds)
