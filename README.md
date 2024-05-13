# TODO APP TASK

### This document describes a Todo backend API built with NestJS, providing functionalities for managing user authentication,create a todo and add task items to the todo. Swagger is used for API documentation, JWT for user authentication, and TypeORM for interacting with a database(MYSQL).

## SETUP
### Prerequisites and Installation

### Steps:
- Clone this repository.

- #### Environment Variables
  - Create a .env file in the project root to store sensitive information:
  -   Include the following variables (replace placeholders with your actual values):
```

 DATABASE_HOST=localhost
 DATABASE_PORT=3306
 DATABASE_USERNAME=your_username
 DATABASE_PASSWORD=your_password
 DATABASE_NAME=todo_db
 JWT_SECRET=your_jwt_secret (strong, random string for JWT signing)
 JWT_EXPIRATION_TIME='3600' (in seconds, e.g., 3600 for 1 hour)

 ```
- Install dependencies :
```bash
npm install
OR
yarn install
```
- Run the application:
```bash
npm run start:dev
OR
yarn start:dev
```
- Access the API documentation at http://localhost:3000/api/.
- Use tools like Postman to send requests and test API functionality or use the intergrated Swagger UI, but with limited functionality, to test API endpoints.(Advice to use postman for testing API endpoints).


## API ENDPOINTS
The main API endpoints are:
<table>
<thead>
  <tr>
  <th>
  Endpoints
  </th>
  <th>
  Methods
  </th>
  <th>
  Descriptions
  </th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  /user/register  
  </td>
  <td>
  POST
  </td>
  <td>
  Register or create a new user
  </td>
  </tr>

  <tr>
<td>
  /user/login  
  </td>
  <td>
  POST
  </td>
  <td>
  Authenticate and login user using jwt, note attach the authToken to the request header auth field for future authentication;
  </td>
  </tr>

   <tr>
<td>
  /user/logout  
  </td>
  <td>
 GET
  </td>
  <td>
  logsout the current user but note, you have to remove the auth token from the client side to prevent future authentication
  </td>
  </tr>

  <tr>
<td>
  /user/todo  
  </td>
  <td>
  GET
  </td>
  <td>
  Retrives all todos for the authenticated user.
  </td>
  </tr>

  <tr>
<td>
  /todo/create  
  </td>
  <td>
  POST
  </td>
  <td>
   Creates a new todo. 
  </td>
  </tr>

  <tr>
<td>
  /todo/:id  
  </td>
  <td>
  GET
  </td>
  <td>
   Retrives a single todo by id. Note:- the todo id is to provided in palce of the (:id) in the endpoint
  </td>
  </tr>

<tr>
<td>
  /todo/update/:id 
  </td>
  <td>
  PUT
  </td>
  <td>
   update a single todo by id. Note:- the todo id is to provided in palce of the (:id) in the endpoint
  </td>
  </tr>

  <tr>
<td>
  /todo/delete/:id 
  </td>
  <td>
  DELETE
  </td>
  <td>
   Deletes a single todo by id. Note:- the todo id is to provided in palce of the (:id) in the endpoint
  </td>
  </tr>

  <tr>
<td>
  /tasks/create/
  </td>
  <td>
  POST
  </td>
  <td>
   Creates a new task under a todo. view the required fields in the swagger ui once application is up and running.
  </td>
  </tr>

  <tr>
<td>
  /todo/alltasks/:id
  </td>
  <td>
  GET
  </td>
  <td>
   Retrives all tasks associated with a todo. Note:- the todo id is to provided in palce of the (:id) in the endpoint
  </td>
  </tr>

  <tr>
<td>
  /tasks/:id
  </td>
  <td>
  GET
  </td>
  <td>
   Retrives a specific task by id.Note:- the task id is to provided in palce of the (:id) in the endpoint
  </td>
  </tr>

   <tr>
<td>
  /tasks/update/id
  </td>
  <td>
  POST
  </td>
  <td>
   update a specific task by id. the task id is to provided in palce of the (:id) in the endpoint
  </td>
  </tr>

   <tr>
<td>
  /tasks/delete/id
  </td>
  <td>
  DELETE
  </td>
  <td>
   delets a specific task by id (soft delete). the task id is to provided in palce of the (:id) in the endpoint
  </td>
  </tr>
  
</tbody>

</table>


## Authentication clarifications

 ### Authentication:

Users need to register or login to access protected API endpoints (all except user/login and user/register).

Login API (user/login) accepts email and password in the request body and returns a JWT token upon successful login.
All other endpoints require a valid JWT token in the Authorization header with the Bearer scheme (e.g., Bearer your_jwt_token_here). 

Usage Examples:
 visit https://www.geeksforgeeks.org/how-to-add-bearer-token-authentication-in-postman/ to view how to added bearer token to postman for authentication.



## NOTE
Access the FULL API documentation at http://localhost:3000/api/. once the application is up and running successfully.


 ## Reach out

- Author - LAWRENCE OGEREKA
- Email - lawrenceanthony70@gmail.com









