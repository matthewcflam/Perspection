START-UP / LOGIN / SIGN-UP / ToS

1. START-UP Page  
   * 1.0 The START-UP page must be the first page to appear on application start-up.  
   * 1.1 The START-UP page must have two buttons: One “LOGIN” button with a bounding box centred on this page, and a second “SIGN-UP” button located in the top-right corner of the page without a bounding box.  
   * 1.2 Clicking the “LOGIN” button must direct the user to the LOGIN page.  
   * 1.3 Clicking the “SIGN-UP” button must direct the user to the SIGN-UP page.  
2. LOGIN Page  
   * 2.0 The LOGIN page must have two input fields centred in the middle: one for the Username and one for the users Password. This password must be greater than 7 characters. The limit for both fields must be set to 20 characters. The LOGIN page must also have another  “SIGN-UP” button under the fields that must redirect the user to the SIGN-UP page also.  
   * 2.1 A “LOGIN button” must be located under the input area of the two fields and must not be able to be pressed until both fields are filled out and the input thresholds are met (the password is greater than 7 characters and both fields have less than 20 characters).  
   * 2.2 When the LOGIN button is pressed after fields are filled, the system must verify that the entered credentials are inside of the SQL database.  
   * 2.3 If the credentials the user inputted are valid, the system must redirect the user to the DASHBOARD page. I If the user’s version counter does not equal the app version, the application must display the ToS page which must be completed by the user (see ToS requirements) before then going to DASHBOARD page.  
   * 2.4  If the application detects that the credentials are invalid:  
     * A popup message must appear stating: “Wrong password or username, try again.”  
     * Both Username and Password fields must be set to empty.  
     * A 401 Unauthorized error must be set and logged.  
3. SIGN-UP Page  
* 3.0 The SIGN-UP page must have two input fields centred in the middle: one for the user’s Username and one for their Password. The password must be greater than 7 characters. The limit for both fields must be set to 20 characters.  
* 3.1 The SIGN-UP page must have a “CREATE ACCOUNT” button below the fields that cannot be pressed until both input fields are filled and the input thresholds are met (password greater than 7 characters, both fields less than 20 characters).  
* 3.2 When the CREATE ACCOUNT button is pressed, the system must check the SQL database to ensure the entered Username does not already exist.  
  * A popup message must appear stating: “This username already exists.”  
    * Both Username and Password fields must be set to empty.  
    * A 401 Unauthorized error must be set and logged.  
* 3.3 If the Username doesn’t exist, the system must create a new user account using the entered name and hashed password. These two input fields must be stored in JSON format as the user’s account data inside of the SQL database.  
* 3.4 When the following account creation is successful, the application must redirect from the SIGN-UP page to the DASHBOARD the user to the LOGIN page.  If the user’s version counter does not equal the app version, the application must display the ToS page which must be completed by the user (see ToS requirements) before then continuing to the DASHBOARD page.

4\. ToS Page

* **4.0** The ToS page must display a scrollable list of the application’s most recent Terms of Service in a bounding box on the application screen.  
* **4.1** The “I AGREE” button must remain disabled (e.g cannot be pressed) until the user has scrolled to the VERY bottom of the Terms of Service text box. This button must not move as the scrollable list is scrolled down or up by the user.  
* **4.2** Clicking the “I AGREE” button must record the user’s acceptance of the Terms of Service and store this information inside of the SQL database under their account updating the system that they have accepted the ToS for the most recent version.  
* **4.3** If the user’s stored ToS version counter does not equal the current application version, the ToS page must pop up again and require the user to scroll down and click the I AGREE button again (See LOGIN and SIGN-UP as well).  
* **4.4** Once the “I AGREE” button has been clicked successfully, the application must redirect to the DASHBOARD page.

Dashboard

5\. Header Display

* 5.0 At the top of the display, a header labelled “Your summarized activity” should be located at the top of the dashboard page.  
* 5.1 The system must display a timestamp line to indicate the selected time window (e.g., “2025/12/06 \- 2025/5/11)  
* 5.2 (future implementations)

6\. Time-Sensitive Playlist Recommendation

* 6.0 The system shall display a dedicated recommendation block on the dashboard below the activity (“Your summarized activity”) header.  
* 6.1 The system shall display a scrollable list of recommended songs located within the confounds of the recommendation block that can be moved up and down.  
* 6.2 The list shall only be as tall as the recommendation block, with new songs popping up at the expense of previous songs going backing into hiding (to create the scrolling effect).  
* 6.3 If insufficient data is collected (as in the users account is less than one day old; this threshold can change later), the recommendation block must display “Not enough data to create personalized playlist. Try again later.”  
* 6.4 Whenever there is a new set of data (user interaction marker) or a time frame change (the day has passed), the recommendation playlist must also update with new songs.

7\. Time-Frame Setting

* 7.0 A separate block must be allocated to the right of recommendation block for time setting  
* 7.1 The system shall allow the user to select a specific start date and end date for the wrapped with the beginning limit threshold at the users account creation date and the date a year ahead from the selected starting date. The start date cannot be greater than the current day and cannot go back longer than 1 month. . The program will not let the user update it otherwise.  
* 7.2 The time-frame setting block on the page must include two data input fields. There will be one button for setting the starting date and the option to set the end date a week, 2 weeks, or 3 weeks ahead. There must be no other options. The starting date CANNOT be less than the selected end date. The program will not let the user update it otherwise.  
* 7.3 A wrong date input shall make the system automatically default to a one year gap with the ending date being the current date.

Paged \-Based Navigation

* One more block that allows the user to set the page number to be redirected to that page on the wrapper  
* Only allow the user to input a page number that is valid (can’t be negative or larger than the total number of pages in wrapper)  
* In the case that the input is invalid, default to page 1  
* Pressing the next button allows it to increment the page number by 1 (avoid retyping page number)

Wrapper Redirection

* A block considerably larger than the previous blocks  
* When pressed it will redirect you to wrapper in the page number specified in the the paged-based navigation block  
* In the case that no valid data for wrapper to be generated, stay in the same screen and display a popup stating “insufficient data to generate wrapper”.

**Wrapped**

**Followers**

* 8.0 The app must display the N most recent accounts the user has followed, where N is configurable (default \= 5).

Each entry must include:

* 8.1 The account’s username or display name  
* 8.2 The date and time when the follow occurred  
* **8.3** The list must be presented in reverse chronological order (most recent first).  
* **8.4** If the user has not followed any new accounts since the last update, the app must display the message: “You haven’t followed anyone recently\!”

Unfollowed

* 9.0 The app must display the N most recent accounts the user has unfollowed (default \= 5).

Each entry must include:

* 9.1 The account’s username or display name  
* 9.2 The date and time when the unfollow occurred 9.3 The list must be ordered from most recent to oldest. 9.4 If no unfollows have occurred, the page must display the message: “You haven’t unfollowed anyone recently\!”

**Followers you don’t follow back**

* 10.0 The app must compute the set of accounts that follow the user but that the user does not follow in return.  
* 10.1 The app must display the total count of such accounts.  
* 10.2 The app must list up to N of these accounts (default N \= 10).  
* 10.3 Each listed entry must include the account’s name and profile picture.  
* 10.4 If there are no such accounts, display the message: “You’re following everyone who follows you\!”

Unfollow these People?

* 11.0 The app must compute the set of accounts that the user follows but that do not follow the user back.  
* 11.1 The app must display the total count of such accounts.  
* 11.2 The app must display up to N of these accounts (default N \= 10).  
* 11.3 Each entry must include the account’s name and profile picture.  
* 11.4 If there are no such accounts, display: “Everyone you follow follows you back\!”

