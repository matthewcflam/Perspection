**UserModel**

**Responsibility**  
The UserModel component represents a user instance.  
The UserModel is directly responsible for the following fields:

* Username  
* Password (hashed)  
* Account preferences

**Location**  
This model lives on the server-side. This will hold all necessary relationships,  
acting as a the highest level relating the user’s data. All data belonging to a user relies  
on the user as a whole. i.e. if the user is deleted, so is all orphaned-data.

**Communication**  
This model must directly communicate with the following:

* LinkedSocialsModel: Stores the LinkedSocialsModels instance belonging this instance.  
* AppController: Hits endpoints which can mutate user preferences, and transports

username and password creation fields. Also sends requests to check for matching  
UserModel credentials in the data base.

* LoginView: Displays the necessary fields for users to enter user information  
* WrappedModel: Anchors WrappedModel to this, so that WrappedModel instances will

be deleted if the account is deleted.

**LinkedSocialsModel**

**Responsibility**  
The LinkedSocialsModel represents an instance containing all linked socials to a user’s account.  
The LinkedSocials Model is directly responsible for the following fields:

* Spotify login  
* Google account login

**Location**  
This model lives on the server-side. This will hold relations with levels above (such as the  
UserModel), and relations below (such as the GoogleModel). This instance is  
deleted if its parent instance is deleted (UserModel instance)

**Communication**  
This model must directly communicate with the following:

* UserModel: Stores the UserModel instance which this model belongs to  
* SpotifyModel: Stores the SpotifyModel instance belonging to this instance  
* GoogleModel: Stores the GoogleModel instance belonging to this instance  
* AppController: Hits endpoints to store linked social accounts. Also hits endpoints which

let the user view or delete accounts

* LinkedAccountsView: Displays the social accounts linked tho this account instance.

Also displays the options to add / delete / view deeper settings for these accounts

**Component 1: LoginView**

**Location:**

* Client

**Responsibility:**

* Displays the login, and collects username/password from the user

**Communicate With:**  
**Authentication Controller**

* Sends: login request containing username \+ password  
* Receives: success/failure status and error messages

**Component 2: DashboardView** 

**Location:**

* Client

**Responsibility:**

* Main post-login/home page  
* Displays various blocks with various functionalities:  
  * Time sensitive music playlist  
  * Page and Time settings  
  * Redirects to Wrapper

**Communicate With:**  
**Dash Board Controller**

* Sends: requests for user settings and inputs  
* Receives: data to display in dashboard UI

**Component 3: WrapperView**

**Location:**

* Client

**Responsibility:**

* Container for all in-app content sections.Handles navigation between sections and displays content provided by the controller.  
* Provides UI elements like tabs, scrollable lists, menus  
* 

**Communicate With:**  
**Authentication Controller**

* Sends: requests for user settings and inputs from view  
* Receives: which page and content to display through fetching data using API\\es: success/failure status and error messages

GoogleModel

Responsibility  
The GoogleModel represents the instance which contains all primary data for linking a Google  
account, as well as all user metadata (gmail or YouTube).

**Location**  
This model lives on the server-side. This will hold relations with the level above  
(LinkedSocialsModel) and relations below (MessagesModel, SubscribedModel,  
WatchedModel).

**Communication**  
This model must directly communicate with the following:

* LinkedSocialsModel: Stores the LinkedSocialsModel this belongs to  
* MessagesModel, SubscribedModel, WatchedModel: Stores the WatchedModel instances,

SubscribedModel instances, MessagesModel  
instances belonging to this

* AppController: Hits endpoints to view categories of data, and wipe instances of

such specified categories of data

* GoogleView: Displays the specific metadata categories, with options to view or delete

Metadata

MessagesModel

Responsibility  
The MessagesModel represents an instance which contains data for a single email /  
conversation.

**Location**  
This model lives on the server-side. This will hold relations with the level above  
(GoogleModel, WrappedModel). This is at the bottom of the hierarchy.

**Communication**  
This model must directly communicate with the following:

* GoogleModel: Stores the GoogleModel this belongs to  
* WrappedModel: Stores processed models which categorize and summarize data

WatchedModel

Responsibility  
The WatchedModel represents an instance which contains data for a single watched  
video.

**Location**  
This model lives on the server-side. This will hold relations with the level above  
(GoogleModel, WrappedModel). This is at the bottom of the hierarchy.

**Communication**  
This model must directly communicate with the following:

* GoogleModel: Stores the GoogleModel this belongs to  
* WrappedModel: Stores processed models which categorize and summarize data

SubscribedModel

Responsibility  
The SubscribedModel represents an instance which contains data for a single watched  
video.

**Location**  
This model lives on the server-side. This will hold relations with the level above  
(GoogleModel, WrappedModel). This is at the bottom of the hierarchy.

**Communication**  
This model must directly communicate with the following:

* GoogleModel: Stores the GoogleModel this belongs to  
* WrappedModel: Stores processed models which categorize and summarize data

WrappedModel

Responsibility  
The WatchedModel represents the instance which contains summarized and categorized  
data based on levels below it, giving music recommendations and user activity summaries.  
This will also recommend playlists or songs based on the user’s daily activity.

**Location**  
This model lives on the server-side. This will hold relations with the levels below  
(SubscribedModel, WatchedModel, MessagesModel). This is on the same level as GoogleModel  
in the hierarchy, though it is isolated from anything above except for the account itself.

**Communication**  
This model must directly communicate with the following:

* MessagesModel, SubscribedModel, WatchedModel: Stores the WatchedModel instances,

SubscribedModel instances, MessagesModel  
instances belonging to this

* AppController: Hits endpoints to view summaries or go to recommended playlists  
* WrappedView: Displays the summarized categories and displays the button to

launch Spotify to play recommended playlists
