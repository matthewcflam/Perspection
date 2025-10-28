# project-alder

***CPEN 221 Project***

**Roles**
Andreas Mendez-Cadrin: Developer
Tony Chen: Developer
Matthew Lam: Designer
Rui Chang: PM
Justin Qu: Developer

**Team Name**
Social Perspective

**Mission Statement**
Making personal data more useful

**Design Problem Description** 
Many social media apps lack a clear and accessible way to access user data and habits in a presentable way. They are often hidden behind walls of menus or only support a very limited number of statistics. An exception to this would be Spotify Wrapped, which shares data annually in a social way. Taking inspiration from Spotify, our team aims to address the feasibility of understanding personal data and creating a personal hub that maps your digital presence. Now, the question we need to ask is: “How do we digest complex data to help people reach simple solutions to everyday tasks?”

***DESIGN YOUR SOLUTION***

**Problem**

In the modern digital environment, a user’s personal data is often spread across numerous applications, devices and web services, from social media platforms, streaming sites, to online shopping and productivity tools. Each separate platform makes it increasingly difficult for users to understand where their data is stored, used, and the time spent on each platform.

This is amplified as when users engage with multiple unique interfaces daily, they lose track of their overall activity online. As a result, many users cannot identify which app they spent the most time on, where personal information is shared, or all the subscriptions that are tied to their bank accounts. The lack of centralized visibility contributes to poor digital awareness, privacy fatigue and ineffective time management.

There are existing tools that track screen time or browser history, but many only capture a partial view of data. These tools fail to provide an integrated and whole view of a user’s digital footprint across all applications. Consequently, users lose a coherent and logical approach to their internet usage. 

This creates a clear need for a user-friendly solution that can consolidate and visualize data from multiple online sources, allowing users to track, understand and control their digital habits.


**Solution**

**Pages**

*ToS and Login*
Terms of Service
Two boxes for Username and Password
Login Button
The ToS will just be a list of conditions that allow the user to scroll down, with a button to accept the ToS and will only continue to the dashboard if it is pressed, otherwise it will stay.

*Dashboard*
Displays headers for different activity categories
1. Display “Your summarized activity”
2. Time-sensitive playlist recommendations 
3. Setting: set time frame for wrapped
4: Ability to jump to any page in wrapped
Each page will show a different statistic as the user taps and presses the space bar through it


*Wrapped (multiple pages, each screen adding*
You followed: Shows your most recent X followed people (with dates)
You unfollowed: Shows your most recent X unfollowed people (with dates)
This many follow you: Shows a list of people who follow you but you don’t follow
This many people don’t follow you: Shows a list of people who don’t follow you
Unfollow them back: Shows a menu select of the people you may want to unfollow


 
**Algorithmic Functions**

*Create User*
If the database does not contain the entered email, create a new login with the email and hashed password, stored in JSON to an SQL database.

*TOS*
If the user’s version counter does not equal the app version, display the TOS before entering the dashboard page.

*Login*
The user enters their username password and password. The result is then stored in JSON, and stored in an SQL database.

*Dashboard*
Displays headers for different activity categories
Display “Your summarized activity”
Time-sensitive playlist recommendations 
Have a setting drop down that allows you to adjust the time frame of data being collected
The user may enter a page number that redirects you to the corresponding screen in wrapper


*Header 1: Recent following*
Shows the most recently followed users in order.

*Header 2: Recent unfollowing*
Shows the most recent users you unfollowed in order.

*Header 3: Who you don’t follow back*
Shows the users with the most mutuals in order, who you don’t follow back.

*Header 4: Who doesn’t follow you back*
Shows the users with the most mutuals in order, who don’t follow you back.

*Header 5: Music recommendation based on messages*
Gives playlist recommendations based on keywords picked up from messages. Basic categories include “joyous”, “sad”, “angry”, “motivational”.

*Wrapped*
Swipe left to go to next page, swipe right to move back one page
Displays a home menu that goes back to dashboard when pressed

**Errors**

*Incorrect Password/Username* 
401: Unauthorized
Clear the username and password
Popup a text stating “wrong password or username” try again.
	
*Network error WIFI*
503: Service unavailable
Popup a text stating “Unable to load your data right now. Please check your connection” whenever new data is needed. 

Not enough information: 
405: Unprocessable entity
Replace all text in that subpage with: “not enough activity to create a recap right now, try again at a later date”

*Insufficient permission*
App cannot access required instagram data
Bring the user back to the TOS screen 


