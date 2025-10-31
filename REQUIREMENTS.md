# Social Perspective - Requirements

## START-UP / LOGIN / SIGN-UP / ToS
### START-UP Page
#### 1.0 The START-UP page must be the first page to appear on application start-up. 
#### 1.1 The START-UP page must have two buttons: One “LOGIN” button with a bounding box centred on this page, and a second “SIGN-UP” button located in the top-right corner of the page without a bounding box.
#### 1.2 Clicking the “LOGIN” button must direct the user to the LOGIN page.
#### 1.3 Clicking the “SIGN-UP” button must direct the user to the SIGN-UP page.
### LOGIN Page
#### 2.0 The LOGIN page must have two input fields centred in the middle: one for the Username and one for the users Password. This password must be greater than 7 characters. The limit for both fields must be set to 20 characters. The LOGIN page must also have another  “SIGN-UP” button under the fields that must redirect the user to the SIGN-UP page also.
#### 2.1 A “LOGIN button” must be located under the input area of the two fields and must not be able to be pressed until both fields are filled out and the input thresholds are met (the password is greater than 7 characters and both fields have less than 20 characters).
#### 2.2 When the LOGIN button is pressed after fields are filled, the system must verify that the entered credentials are inside of the SQL database.
#### 2.3 If the credentials the user inputted are valid, the system must redirect the user to the DASHBOARD page. I If the user’s version counter does not equal the app version, the application must display the ToS page which must be completed by the user (see ToS requirements) before then going to DASHBOARD page.
#### 2.4  If the application detects that the credentials are invalid:
A popup message must appear stating: “Wrong password or username, try again.”
Both Username and Password fields must be set to empty.
A 401 Unauthorized error must be set and logged.
