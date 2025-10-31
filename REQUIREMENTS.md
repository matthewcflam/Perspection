# Social Perspective - Requirements

## START-UP / LOGIN / SIGN-UP / ToS
### 1. START-UP Page
1.0 The START-UP page must be the first page to appear on application start-up. 
1.1 The START-UP page must have two buttons: One “LOGIN” button with a bounding box centred on this page, and a second “SIGN-UP” button located in the top-right corner of the page without a bounding box.
1.2 Clicking the “LOGIN” button must direct the user to the LOGIN page.
1.3 Clicking the “SIGN-UP” button must direct the user to the SIGN-UP page.
### 2. LOGIN Page
2.0 The LOGIN page must have two input fields centred in the middle: one for the Username and one for the users Password. This password must be greater than 7 characters. The limit for both fields must be set to 20 characters. The LOGIN page must also have another  “SIGN-UP” button under the fields that must redirect the user to the SIGN-UP page also.
2.1 A “LOGIN button” must be located under the input area of the two fields and must not be able to be pressed until both fields are filled out and the input thresholds are met (the password is greater than 7 characters and both fields have less than 20 characters).
2.2 When the LOGIN button is pressed after fields are filled, the system must verify that the entered credentials are inside of the SQL database.
2.3 If the credentials the user inputted are valid, the system must redirect the user to the DASHBOARD page. I If the user’s version counter does not equal the app version, the application must display the ToS page which must be completed by the user (see ToS requirements) before then going to DASHBOARD page.
2.4  If the application detects that the credentials are invalid: A popup message must appear stating: “Wrong password or username, try again.” Both Username and Password fields must be set to empty, and a 401 Unauthorized error must be set and logged.

### 3. SIGN-UP Page
3.0 The SIGN-UP page must have two input fields centred in the middle: one for the user’s Username and one for their Password. The password must be greater than 7 characters. The limit for both fields must be set to 20 characters.
3.1 The SIGN-UP page must have a “CREATE ACCOUNT” button below the fields that cannot be pressed until both input fields are filled and the input thresholds are met (password greater than 7 characters, both fields less than 20 characters).
3.2 When the CREATE ACCOUNT button is pressed, the system must check the SQL database to ensure the entered Username does not already exist.
A popup message must appear stating: “This username already exists.”
Both Username and Password fields must be set to empty.
A 401 Unauthorized error must be set and logged.
3.3 If the Username doesn’t exist, the system must create a new user account using the entered name and hashed password. These two input fields must be stored in JSON format as the user’s account data inside of the SQL database.
3.4 When the following account creation is successful, the application must redirect from the SIGN-UP page to the DASHBOARD the user to the LOGIN page.  If the user’s version counter does not equal the app version, the application must display the ToS page which must be completed by the user (see ToS requirements) before then continuing to the DASHBOARD page.

## 4. ToS Page
4.0 The ToS page must display a scrollable list of the application’s most recent Terms of Service in a bounding box on the application screen.
4.1 The “I AGREE” button must remain disabled (e.g cannot be pressed) until the user has scrolled to the VERY bottom of the Terms of Service text box. This button must not move as the scrollable list is scrolled down or up by the user.
4.2 Clicking the “I AGREE” button must record the user’s acceptance of the Terms of Service and store this information inside of the SQL database under their account updating the system that they have accepted the ToS for the most recent version.
4.3 If the user’s stored ToS version counter does not equal the current application version, the ToS page must pop up again and require the user to scroll down and click the I AGREE button again (See LOGIN and SIGN-UP as well).
4.4 Once the “I AGREE” button has been clicked successfully, the application must redirect to the DASHBOARD page.
