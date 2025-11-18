# Currently a testing ground for all backend features
from parser import InstagramConnectionsParser
from parser import InstagramActivityParser
from parser import InstagramMessagesParser
from parser import InstagramParser

def main():
    
    export_root = input("Enter path to data folder: ").strip()
    
    connections = InstagramConnectionsParser(export_root)
    activity = InstagramActivityParser(export_root)
    messages = InstagramMessagesParser(export_root)
    name = InstagramParser(export_root) # test
    
    connections.load_followers_and_following()
    connections.load_close_friends()
    connections.load_follow_requests()
    connections.load_unfollowed()
    
    activity.load_liked_posts()
    activity.load_liked_stories()
    
    messages.load_all_messages()
    
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
    top_messaged_users = messages.get_top_5_user_msg()
    # least_messaged_users = messages.get_bottom_5_users()
    
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
    print(f"Top Users Messaging You: {top_messaged_users}")
    # print(f"Bottom Users Messaging You: {least_messaged_users}")
    print(f"Only following (they don't follow you back): {len(only_following)}")
    print(f"Only followers (you don't follow them back):  {len(only_followers)}")
    
    show_n = 10
    
    if only_following:
        print(f"\nFirst {show_n} accounts you follow that don't follow you back:")
        for username in list(sorted(only_following))[:show_n]:
            print("  -", username)
            
    # if only_followers:
    #     print(f"\nFirst {show_n} accounts you don't follow that follow you back:")
    #     for username in list(sorted(only_followers))[:show_n]:
    #         print("  -", username)

if __name__ == "__main__":
    main()