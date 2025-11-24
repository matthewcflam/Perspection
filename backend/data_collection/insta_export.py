from insta_parser import InstagramParser  # adjust import to your filename

def main():
    export_root = input("Enter path to data folder: ").strip()

    ig = InstagramParser(export_root)

    # Connections
    ig.load_followers_and_following()
    ig.load_close_friends()
    ig.load_follow_requests()
    ig.load_unfollowed()

    # Activity
    ig.load_liked_posts()
    ig.load_liked_stories()

    # Messages
    ig.load_all_messages()

    personal_name = ig._extract_personal_name()  # same as before

    followers = ig.followers
    following = ig.following
    follow_requests = ig.follow_requests
    unfollowed = ig.unfollowed
    close_friends = ig.close_friends

    mutuals = ig.get_mutuals()
    only_followers = ig.get_followers_only()
    only_following = ig.get_following_only()

    total_liked_posts = ig.get_total_liked_posts()
    top_liked_users = ig.get_top_5_users()
    total_liked_stories = ig.get_total_liked_stories()

    total_messages = ig.get_total_msg_sent()
    top_messaged_recievers = ig.get_top_5_user_recievers()
    top_messaged_users = ig.get_top_5_user_msg()
    top_streaks = ig.get_top_3_dm_streaks()
    minutes_after_midnight = ig.get_after_midnight_sent()
    top_late_messegers = ig.get_top_5_user_late_msg()
    total_reels_sent = ig.get_total_reels_sent()

    print("\n--- Basic stats ---")
    print(f"Name: {personal_name}")
    print(f"Followers: {len(followers)}")
    print(f"Following: {len(following)}")
    print(f"Recent Follow Requests: {len(follow_requests)}")
    print(f"Recent Unfollowed Accounts: {len(unfollowed)}")
    print(f"Close friends: {len(close_friends)}")
    print(f"Liked Posts: {total_liked_posts}")
    print(f"Liked Stories: {total_liked_stories}")
    print(f"Top Liked User Posts: {top_liked_users}")
    print(f"Mutuals:   {len(mutuals)}")
    print(f"Total Messages Sent: {total_messages}")
    print(f"Top Users You are Messaging: {top_messaged_recievers}")
    print(f"Top Users Messaging You: {top_messaged_users}")
    print(f"Top Streaks with Users: {top_streaks}")
    print(f"Time Spent After Midnight: {minutes_after_midnight}")
    print(f"Top Users Texting After Midnight: {top_late_messegers}")
    print(f"Total Reels Sent: {total_reels_sent}")
    print(f"Only following (they don't follow you back): {len(only_following)}")
    print(f"Only followers (you don't follow them back):  {len(only_followers)}")

    show_n = 10

    if only_following:
        print(f"\nFirst {show_n} accounts you follow that don't follow you back:")
        for username in list(sorted(only_following))[:show_n]:
            print("  -", username)


if __name__ == "__main__":
    main()