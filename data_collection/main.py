# Currently a testing ground for all backend features
from parser import InstagramConnectionsParser

def main():
    
    export_root = input("Enter path to data folder: ").strip()
    
    parser = InstagramConnectionsParser(export_root)
    
    parser.load_followers_and_following()
    parser.load_close_friends()
    parser.load_follow_requests()
    parser.load_unfollowed()
    
    followers = parser.followers
    following = parser.following
    follow_requests = parser.follow_requests
    unfollowed = parser.unfollowed
    
    close_friends = parser.close_friends
    
    mutuals = parser.get_mutuals()
    only_followers = parser.get_followers_only()
    only_following = parser.get_following_only()
    
    print("\n--- Basic stats ---")
    print(f"Followers: {len(followers)}")
    print(f"Following: {len(following)}")
    print(f"Recent Follow Requests: {len(follow_requests)}")
    print(f"Recent Unfollowed Accounts: {len(unfollowed)}")
    print(f"Close friends: {len(close_friends)}")
    print(f"Mutuals:   {len(mutuals)}")
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