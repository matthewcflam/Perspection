from google_client import GoogleClient

def main():
    client = GoogleClient(
        creds_path="credentials.json",
        token_path="token.json"
    )

    print("Drive:")
    for f in client.drive.list_files():
        print(f)

    print("\nYouTube:")

    print("New subscriptions within a certain date")
    subs = client.youtube.list_subscriptions_in_range(
        "2023-03-15T00:00:00Z",  # Use past dates
        "2025-11-15T23:59:59Z",
        limit=30
    )
    print(subs)


    print("Fetching liked videos")
    liked_data = client.youtube.get_user_liked_videos_in_range(
        "2023-03-15T00:00:00Z",
        "2025-11-15T23:59:59Z",
        limit=25
    )
    if liked_data.get("count", 0) > 0:
        print(f"\nFound {liked_data['count']} liked videos:")

        for video in liked_data["videos"]:
            print(f"  - Title: {video['title']}")
            print(f"    Video ID: {video['video_id']}")
            print(f"    Liked At: {video['liked_at']}\n")
    else:
        print("No liked videos found in that time period.")

    top_creators = client.youtube.get_most_liked_creators(
    start_date="2023-03-15T00:00:00Z",
    end_date="2025-11-15T23:59:59Z"
    )

    # Print the results
    if top_creators:
        for i, creator in enumerate(top_creators, 1):
            print(f"{i}. {creator['name']} - {creator['liked_count']} liked videos")
    else:
        print("Could not find any liked videos to analyze in that period")


    print("\nGmail:")
    print("\n5 most recent messages:")
    for m in client.gmail.list_inbox():
        print(m)
        
    print("\nMost recieved emails by sender:")
    for sender, count in client.gmail.top_senders(messages_limit=1000, top_n=5):
        print(sender, count)


if __name__ == "__main__":
    main()
