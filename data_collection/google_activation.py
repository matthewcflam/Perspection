from google_auth_oauthlib.flow import InstalledAppFlow
from pathlib import Path

SCOPES = ["https://www.googleapis.com/auth/gmail.readonly",
          "https://www.googleapis.com/auth/youtube.readonly",
          "https://www.googleapis.com/auth/drive.metadata.readonly"]

def main():
    flow = InstalledAppFlow.from_client_secrets_file(
        "data_collection/credentials.json",
        scopes=SCOPES,
    )

    creds = flow.run_local_server(port=0)   # opens browser

    Path("token.json").write_text(creds.to_json(), encoding="utf-8")
    print("Saved token.json")

if __name__ == "__main__":
    main()