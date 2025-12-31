# **Plan**

---

## **1\. How will you coordinate your work?**

* **Who will coordinate the work?**  
  * Tony Chen, PM  
* **What will their project management practices be?**  
  * Tony’s project management practices will involve keeping the workflow organized and making sure everyone stays on track to meet Milestone deadlines. To do this, Tony, our PM, will create a group reminders list that will be shared and regularly updated on iMessage and Discord (see our communication tools). He will create and assign tasks, and regularly update the group on our progress as work moves forward using the reminders list and messages.   
  * Tony will schedule and hold two brief in-person meetings each week at the Hector J. MacLeod Building at the University of British Columbia to review progress, discuss issues that arose earlier in the week, and adjust weekly goals as required. Meeting times will vary depending on group availability, but at least two in-person meetings will always be held and enforced by Tony to prevent delays. Tony will set the meeting agendas and guide discussions so that everyone leaves with clear goals for the week. He will also lead a short FaceTime meeting on weekends to continue group coordination when in-person meetings are not possible (such as on weekends when members are at home).  
  * All code changes will go through pull-request reviews that Tony will oversee to keep our work consistent and catch problems early through a central system.  
  * If someone is sick or struggles with implementing or completing a task, Tony will communicate this with the member and the group and redistribute tasks or adjust the timeline to keep the project moving smoothly. This approach will keep the project running smoothly and will help us complete our project by the end of the deadline  
* **Will you have meetings? How frequently? Who plans their agendas?**  
  * As stated above, Tony will organize two in-person meetings per week at the Hector J. MacLeod Building. Meeting times may change weekly based on availability, but two per week is the minimum requirement. There will also be a short FaceTime meeting on weekends to allow for continued coordination and collaboration outside of class hours. Tony, our PM, will plan the agendas and lead all meetings.

**Written Justification:**

These coordination methods ensure that everyone stays on the same page and is aware of their responsibilities throughout the project.  Due to each member usually working independently and then later committing their work, it is crucial that everybody is on the same page. Miscommunication from one individual can lead to catastrophic bugs and wasted time in the future, which is a resource we cannot afford to spend haphazardly. Therefore the size of this project and its myriad of moving parts means that concrete meetings, reminders, and goals set by the Project Manager are very much needed. These organizational and accountability measures help mitigate risk involved with unexpected illnesses, exams and homework,  personal issues that may arise with members, and most importantly proper and error-free workflow. For example, meetings allow for clear checkpoints, allowing Tony to identify issues early and adjust tasks and goals accordingly. Furthermore, by having our PM Tony set the agendas, manage communication tools, and oversee task distribution, everything will be organized. Our team can maintain accountability and adapt to obstacles listed above. This is even more relevant as we must meet the strict and timely deadlines this project offers. 

---

## **2\. What tools will you use to communicate?**

| Tool | Purpose | Best Choice Because... | Alternatives & Justification for Rejection |
| :---- | :---- | :---- | :---- |
| **Discord** | Communicating technical ideas, using multiple server channels for organization, notifying group members, and easily exchanging files / information. | \- Group audio calls make it convenient to coordinate between multiple people while working on a computer remotely. \- Able to send large files to all the members. \-All group members already regularly use this application. \-Available on mobile and desktop devices for easy access. | Discord is a platform that is easy to communicate technical details to each user, and easy to communicate to multiple people within a group setting. This allows for files to be sent between users easily and keeps all members updated. Unlike Slack, which limits message history and file uploads, or Microsoft Teams, which requires more setup and is less flexible for fast collaboration, Discord offers a simple, accessible environment on both desktop and mobile. Since all members already use it regularly, it’s the most efficient and reliable option for coordinating work and keeping everyone updated. |
| **iMessage** | Main group chat: sharing reminders/tasks, sharing ideas, delegating tasks, and communicating meetup times. | \- Easy to communicate between members and has a history of fast response times between everyone \-A group chat between all the group members is already created and remains active \-group members are familiar with the capabilities of iMessage | Using iMessage ensures important updates reach everyone instantly through notifications and pings, unlike Instagram or Discord, which members may not have notifications on for. It is a reliable platform for quick and robust communication. There is also a quick ability to share reminders and photos which is useful for the PM. Furthermore, since all group members use it regularly and there is already a group chat made, implementing this into our plan will be seamless. |
| **Facetime** | Remote meetings and communicate complex ideas to away members in real time. | \- Provides the clearest alternative for including members in group discussions or working synchronously remotely. | Discord voice channels do not allow for easy webcam sharing, and notifications are realistically less urgent than Facetime notifications which cause members’ phones to ring. |

---

## **3\. Who will own components in your architecture?**

| Team Member | Architectural Component |
| :---- | :---- |
| Matthew | Frontend Viewer (assigning visual components to hit certain endpoints, enforcing valid inputs, making the “screens” / visuals).  Database and server uptime |
| Andreas | Backend Models (schemas / rules / logic for different components) API testing Gemini integration? Database and server uptime |
| Tony | Frontend Controller (how to request the right data, when to display, ensure fast load times on front-end) Data scraping |
| Justin | Frontend Viewer (assigning visual components to hit certain endpoints, enforcing valid inputs, making the “screens” / visuals).  |
| Rui | Backend endpoints (get, put, patch, delete methods) Setting up CORS for frontend permissions Setting up dockerfiles and managing website versions on Google Cloud |

**Written Justification:** 

- Responsibilities are allocated depending on each individual's strengths and weaknesses. 
- Those who were assigned tasks with little to no experience in their respective area were assigned less tasks so sufficient time can be taken to learn the topic.
- Tasks were distributed with time taken into consideration. Each member should in theory be assigned a similar amount of workload. 

---

## 

## **4\. What is your timeline?**


| Milestone | Deadline | Focus/Deliverables |
| :---- | :---- | :---- |
| **M1: Project Layout and Programming Structure** | 11/10/25 | Determine the structure and how each component works together technically. Determine which programming languages are being used and start creating the structure behind each component (e.g. frontend UI is minimally set up, algorithm code has been partially brought up and can be explained and debugged). |
| **M2: Backend MVP** | 11/20/25 | Have the full backend structure up and going for a minimally viable product (MVP). Ensure all algorithms, schemas, and API calls work as intended and test potential edge cases to ensure the program works in all potential cases.  |
| **M3: Frontend MVP** | 11/23/25 | From the finishing of the backend MVP, ensure that both the front and backend programs are integrated smoothly. Ensure the UI is modern, simple and attractive to users. Test all buttons and interactive features to ensure it works as intended. Check the interface on both mobile and computer views, ensuring the UI works as intended on both views. |
| **M4: Final Product** | 11/27/25 | Deliver a fully functional, polished version of the product that includes all key features from both backend and frontend MVPs. Ensure that all major bugs are fixed, the UI/UX is refined for usability and visual consistency, and all core algorithms are optimized for performance. Conduct comprehensive testing, including stress testing, user testing, and integration validation, to ensure reliability across platforms. Prepare project documentation, final presentation materials, and deployment setup (e.g., server hosting, database configuration, and version control). |
| **Stretch Goal: Personalized Recs** | 11/28/25 | Add an advanced feature that goes beyond the MVP, such as an analytics dashboard that visualizes real-time data, personalized recommendations based on user activity. This stretch goal aims to demonstrate scalability and innovation, showcasing how the product can evolve beyond its initial scope. |

| Milestones | Start Date | End Date | Duration (days) | Focus |
| :---- | ----- | ----- | ----- | :---- |
| M1 | 08/11 | 12/11 | 5 | Project structure setup |
| M2 | 13/11 | 20/11 | 8 | Backend MVP |
| M3 | 13/11 | 23/11 | 3 | Frontend MVP |
| M4 | 24/11 | 28/11 | 7 | Final Product Polish |
| Stretch Goal | 24/11 | 28/11 | 7 | Feature Expansion |

**Written Justification:** 

This timeline is structured to ensure a logical progression from foundational setup to a complete, fully functional product within a short development cycle. The early milestones (M1–M2) prioritize establishing the technical backbone, defining the project layout, selecting the programming framework, and building the backend MVP to ensure the system’s logic and data handling are reliable before any visual design is introduced. Once the backend is stable, the focus shifts to the frontend MVP (M3), allowing for integration between both components and early user testing. The final stage (M4) emphasizes polish, testing, and optimization to ensure performance, usability, and scalability. This prioritization ensures that a minimum viable product (MVP) is completed early enough for iteration and improvement, while leaving room for stretch goals such as advanced analytics or feature enhancements that build upon the core system.

---

## **5\. How will you verify that you've met your requirements?**


### **Acceptance Testing Matrix**

| Requirement  | Verification Method (inspection/ test) | Verification Details | Passing Criteria | Justification (if you don’t verify it) |
| :---- | :---- | :---- | :---- | :---- |
| 1.0, 1.2 | Inspection | Walk through the website  | If the requirement (true/false) is met |  |
| 1.3 | Inspection | Ensure buttons call proper endpoints to redirect to login or sign-up pages | If the requirement (true/false) is met |  |
| 2.0, 2.1 | Inspection | Ensure login fields are present and allow input text | If the requirement (true/false) is met |  |
| 2.2, 2.3, 2.4 | API tests | Input valid and invalid user details | Ensure login properly authenticates/rejects users |  |
| 3.0, 3.1 | Inspection | Ensure sign-up fields are present and allow input text |  |  |
| 3.2, 3.3 | API tests | Input existing and non-existing user details. Test password creation enforcement (\>7 characters) | Ensure sign-up successfully creates / rejects accounts |  |
| 4.0 | Inspection | Check if ToS page displays the terms of service in the proper manner | The ToS page pops up properly with the correct wording (true/false) |  |
| 4.1 | User Test | Attempt to check off the “I agree” button before scrolling to the button. Then try it after scrolling to the bottom | The button should remain disabled as long as the user hasn’t scrolled the the very bottom of the ToS page |  |
| 4.2 | API Test | After clicking “I AGREE”, check the database entry for user ensuring the ToS acceptance data is updated | Database correctly stores whether the user accepted the most recent ToS version |  |
| 4.3 | User Test | Set a user account with an outdated ToS accepted version, login and check if the ToS appears.  | User is redirected to the updated ToS page when the user account data is based off the old ToS data.  |  |
| 4.4 | User Test | Observe whether the user is redirected to DashBoard after clicking “I agree” | User is redirected to the dashboard |  |
| 5.0-5.2 | Inspection and API tests | Displays activity and summarises data. Allows for interaction to view further details | If the display details requirement (true/false) is met. If the endpoints redirect to the correct summary pages |  |
| 6.0, 6.1, 6.2 | Inspection | Ensure that the user is on dashboard with enough data such that the playlist has data | Properly displays the same ui functions as written in the requirement section |  |
| 6.3 | User Test | Login with an account with less than one day of data (or no data) | The playlist block displays “not enough data to create personalized playlist. Try again later” |  |
| 6.4 | Test(functional) | Check if recommendation list updates accordingly with new sets of data | Playlist refreshes when presented with new data |  |
| 7.0, 7.2 | Inspection | Make sure that the user tests within the dashboard page.  | Make sure the time-setting block is displayed correctly with the proper ui functions as per the requirement page in milestone 2 |  |
| 7.1 | Test | Start data limits are enforced: Connect be after today, cannot be older than 1 month, cannot exceed account creation date.  End data must be exactly 1, 2, 3 weeks after the start data.  | The time-setting block displays correctly and only accepts valid data selections, and rejects invalid ranges.  |  |
| 8.0 | Inspection | Ensure the test user is at the follower page in wrapped | The app must display the N most recent accounts the user has followed, where N is configurable (default \= 5). |  |
| 8.1-8.3 | inspection | Validate for all pages in the wrapped section | Ensure that the requirements from 8.1-8.3 are properly displayed in all pages of wrapped per the requirements in milestone 2 |  |
| 10.0-10.1 | inspection | Ensure the user is in the “followers who don’t follow you back” page.  | Validate if the page displays the correct number of individuals who don’t follow you back |  |
| 10.2, 10.3 | User Test \+ inspection | Ensure the user is in the “followers who don’t follow you back” page.  | Validate if the page displays N accounts with username and profile picture of people who don’t follow you (N default is 10\) |  |
| 10.4 | User Test | Use an account where the user follows all counts that follow them. Check what the page displays | The message “you’re following everyone who follows you\!” appears when the mismatch set is empty |  |

### 


