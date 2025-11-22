from google_client import GoogleClient

def main():
    client = GoogleClient(
        creds_path="data_collection/credentials.json",
        token_path="token.json"
    )

    print("Drive:")
    for f in client.drive.list_files():
        print(f)

    print("\nYouTube:")
    for s in client.youtube.list_subscriptions():
        print(s)

    print("\nGmail:")
    for m in client.gmail.list_inbox():
        print(m)

if __name__ == "__main__":
    main()
