from backend.data_collection.insta_parser_old import InstagramParser  # adjust import to your filename

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

    follow_requests = ig.get_follow_req()
    unfollowed = ig.get_unfollowed()
    close_friends = ig.get_close_friends()

    followers = ig.get_follower_count()
    following = ig.get_following_count()
    mutuals = ig.get_mutuals()
    only_followers = ig.get_followers_only()
    only_following = ig.get_following_only()
    list_not_following_back = ig.get_only_following()

    total_liked_posts = ig.get_total_liked_posts()
    top_liked_users = ig.get_top_5_users()
    total_liked_stories = ig.get_total_liked_stories()

    total_messages = ig.get_total_msg_sent()
    top_messaged_recievers = ig.get_top_5_user_recievers()
    top_messaged_users = ig.get_top_5_user_msg()
    top_streaks = ig.get_top_3_dm_streaks()
    minutes_after_midnight = ig.get_after_midnight_sent()
    top_late_messegers = ig.get_top_5_user_late_msg()
    recent_messages = ig.get_recent_messages()
    total_reels_sent = ig.get_total_reels_sent()

    print("\n--- Basic stats ---")
    print(f"Name: {personal_name}")
    print(f"Followers: {followers}")
    print(f"Following: {following}")
    print(f"Recent Follow Requests: {follow_requests}")
    print(f"Recent Unfollowed Accounts: {unfollowed}")
    print(f"Close friends: {close_friends}")
    print(f"Liked Posts: {total_liked_posts}")
    print(f"Liked Stories: {total_liked_stories}")
    print(f"Top Liked User Posts: {top_liked_users}")
    print(f"Mutuals:   {mutuals}")
    print(f"Total Messages Sent: {total_messages}")
    print(f"Top Users You are Messaging: {top_messaged_recievers}")
    print(f"Top Users Messaging You: {top_messaged_users}")
    print(f"Top Streaks with Users: {top_streaks}")
    print(f"Time Spent After Midnight: {minutes_after_midnight}")
    print(f"Top Users Texting After Midnight: {top_late_messegers}")
    print(f"Total Reels Sent: {total_reels_sent}")
    print(f"Only following (they don't follow you back): {only_following}")
    print(f"Only followers (you don't follow them back):  {only_followers}")
    print(f"People that don't follow you back:  {list_not_following_back}")
    print(f"Your recent direct messages: {recent_messages}")

if __name__ == "__main__":
    main()