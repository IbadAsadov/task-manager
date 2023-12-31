## Project tech stack
- Typescript
- React
- Ant Design
- Redux-toolkit
- React-router-dom
- Json-server

## Project installation

1.Upload npm packages
```
yarn install
```

2.Run backend API json-server 
```
yarn server
```

3.Run react project 
```
yarn dev
```

## Info 
`/login` : route login for all user

`/register` : route register for company and organization account

## Roles: 
1. admin
2. organization
3. user

## Admin account
#### email: admin@gmail.com
#### password: 12345678



## Project 


• UI design.

• Use mock data to fulfil task's needs.

• Mock data might be formatted from different roles in proposed systems (admin
mock data, user mock data etc.) 
• Answers should be expected as Gitlab/GitHub repo.
Technologies to be used:

• React.js (React-hooks, Redux or Redux-toolkit) is mandatory and any other
technologies are preferable.

• Layout and design on candidate consideration

## User Stories:
#### 1) SIGN UP.
  As a potential customer I want to sign up to create my organization profile So that I can organize my staff and tasks on the  platform. Acceptance Criteria:

1. Open to anyone who has access to the app.
2. Enter Organization Name, Phone Number, Address.
3. Enter user name, email and password.

#### 2) MANAGE USERS.
As an Organization administrator I want to add users to my organization So that
they can
use platform. Acceptance Criteria:

1. Only ADMINS can create the user for organization.
2. Each user should have name, surname, email and default password.

#### 3) MANAGE TASKS.
As a user at I want to manage daily tasks of my organization So that I can quickly access and see status of the tasks. Acceptance Criteria:

 1.  Create task and assign it to one or more users.
2. Each task should have title, description, deadline and status.
3. Each user of organization can list the all tasks.

#### 4) SIGN IN.

As a user I want to sign in and access my customer profile details. Acceptance Criteria: 
1. Only allow passwords with 6 or more alphanumeric
characters