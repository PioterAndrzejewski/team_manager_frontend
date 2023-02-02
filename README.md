

<!-- PROJECT LOGO -->
<p align="center">

<img src="https://user-images.githubusercontent.com/109315248/216438997-36ea03a5-6de8-467e-af10-c6a0ffe0f402.png" alt="Team Manager logo"> 

  
  
</p>
<h3 align="center">Team Manager</h3>

  <p align="center">
    Team Manager - frontend
    <br />
    <a href="/">View Demo</a>
  </p>
</div>

## Getting started

After cloning the repository and installing dependencies run the app using npm start command. 

  ```sh
  $ git clone https://github.com/PioterAndrzejewski/team_manager_frontend.git
  $ cd team_manager_frontend
  $ npm i
  $ npm start
  ```
Now you're ready to test the app in your browser on localhost:3000

### Built With

- react,
- mui,
- react-router,
- react-chrono,

## About The Project

This is a web app created to help manage your teams and projects you are working with. 

### Project Aim

The goal was to use in practice programming skills learned from courses and in the same time create application that may be used in practice. This two objectives were leading the way during the whole project development and indicating the features that may be useful and should be created.

### Back-end

Team Manager is full stack app. 
See back-end repo <a href="https://github.com/PioterAndrzejewski/team_manager_backend">Here</a>

    
 ## Features
 
The front-end single page application allows you to manage your team using the following modules:

 ### open project
![image](https://user-images.githubusercontent.com/109315248/216441497-7e47c461-19aa-4746-9c2b-26d2750f9b2a.png)

- Allows you to open already existing project,
- Allows you to use shortcut with lastly opened project,

After a successful operation, it returns success information with the ID of the new project.
 
  ### create a project
 
![image](https://user-images.githubusercontent.com/109315248/216441578-a57b480a-cec6-40cb-a4f6-5bf11429332f.png)
 
- Allows you to create new project based on given name and leaders' name.

### home screen

![image](https://user-images.githubusercontent.com/109315248/216441770-57fad3e7-7662-4f37-bb6b-c36dbd6b12d8.png)

- Allows you to view active tasks on horizontal timeline
- This screen also allows you to see a list of overdue tasks, recently closed tasks and basic statistics.

![image](https://user-images.githubusercontent.com/109315248/216441926-56bd1cf4-268e-4aa5-bca4-d35f375485c2.png)
 
  ### Manage a team
 
![image](https://user-images.githubusercontent.com/109315248/216442536-ec27b46f-b2b5-415e-8a77-7e96ce180c96.png)

- Allows you to add new member, edit existing members and remove them,

![image](https://user-images.githubusercontent.com/109315248/216442642-560f8132-9575-4af2-b1e4-35ca77f9bee8.png)

  ### Member tasks
  
  ![image](https://user-images.githubusercontent.com/109315248/216442798-4296370d-8e0b-4e85-babc-7e688acdc8b2.png)

 Lists all tasks to which a given user is assigned.

  ### Manage tasks
  
![image](https://user-images.githubusercontent.com/109315248/216443021-7c84e99a-2ef0-42cd-bb8b-55cfe3361762.png)

Lists all tasks divided into completed and not completed.
It also allows you to edit and add both members and people assigned to tasks.

### manage project

![image](https://user-images.githubusercontent.com/109315248/216443208-f15688a0-f292-4191-a898-78305b51ea56.png)

It allows you to rename the project and completely delete the data.

 ## Project status
 
 The main core of the application is finished. Is has all the functions that were established at the beginning of the project. The architecture of the application allows to add more features without major interference with the current ones.

Next phase is to check the project in use and according to received feedback establish next development steps.

## Room for improvement

The main development opportunities are:

- integration with google or Microsoft services (calendar, to-do List etc.),
- creating new user type - with access to data without possibility to change it, or change it with limited scope,
- implementation of authentication,

