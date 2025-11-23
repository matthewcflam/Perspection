from parser_insta import InstagramConnectionsParser
from parser_insta import InstagramActivityParser
from parser_insta import InstagramMessagesParser
from parser_insta import InstagramParser

def parse_instagram_export(export_root: str) -> dict:

    connections = InstagramConnectionsParser(export_root)
    activity = InstagramActivityParser(export_root)
    messages = InstagramMessagesParser(export_root)
    name = InstagramParser(export_root)

    # Load all datasets
    connections.load_followers_and_following()
    connections.load_close_friends()
    connections.load_follow_requests()
    connections.load_unfollowed()

    activity.load_liked_posts()
    activity.load_liked_stories()

    messages.load_all_messages()

    # Extract data
    personal_name = name._extract_personal_name()
    followers = connections.followers
    following = connections.following
    follow_requests = connections.follow_requests
    unfollowed = connections.unfollowed
    close_friends = connections.close_friends

    mutuals = connections.get_mutuals()
    only_followers = connections.get_followers_only()
    only_following = connections.get_following_only()

    total_liked_posts = activity.get_total_liked_posts()
    top_liked_users = activity.get_top_5_users()
    total_liked_stories = activity.get_total_liked_stories()

    total_messages = messages.get_total_msg_sent()
    top_messaged_recievers = messages.get_top_5_user_recievers()
    top_messaged_users = messages.get_top_5_user_msg()
    top_streaks = messages.get_top_3_dm_streaks()
    minutes_after_midnight = messages.get_after_midnight_sent()
    top_late_messegers = messages.get_top_5_user_late_msg()
    total_reels_sent = messages.get_total_reels_sent()

    # Return as a structured dict for JSON
    return {
        "basic": {
            "name": personal_name,
            "followers": len(followers),
            "following": len(following),
            "followRequests": len(follow_requests),
            "unfollowed": len(unfollowed),
            "closeFriends": len(close_friends),
        },
        "activity": {
            "likedPosts": total_liked_posts,
            "likedStories": total_liked_stories,
            "topLikedUsers": top_liked_users,
        },
        "messages": {
            "totalMessages": total_messages,
            "topMessagedReceivers": top_messaged_recievers,
            "topMessagedUsers": top_messaged_users,
            "topStreaks": top_streaks,
            "afterMidnightMinutes": minutes_after_midnight,
            "topLateMessagers": top_late_messegers,
            "totalReelsSent": total_reels_sent,
        },
        "relations": {
            "mutuals": len(mutuals),
            "onlyFollowers": len(only_followers),
            "onlyFollowing": len(only_following),
        }
    }

# Keeps CLI behavior for testing
if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        export_root = input("Enter path to data folder: ").strip()
    else:
        export_root = sys.argv[1]

    stats = parse_instagram_export(export_root)
    import json
    print(json.dumps(stats, indent=2))