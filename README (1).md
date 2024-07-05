## Task: Build an API with NestJS, MongoDB, and Swagger

### Prerequisites:

1. Node.js installed on your machine.
2. MongoDB installed locally or access to a cloud MongoDB instance.
3. NestJS CLI installed on your machine.

### Task Description:

Create a RESTful API using NestJS and MongoDB. The project should include the following features:

1. Authentication system using JWT, including login and sign-up endpoints.
2. CRUD operations (Create, Read, Update, Delete) for the following entities:
    - Users
    - Articles
3. API documentation using Swagger.

### Steps:

1. **Initialize a new NestJS project:**
    
    ```bash
    nest new articles-api-v1
    
    ```
    
2. **Install necessary packages:**
    
    ```bash
    npm install @nestjs/mongoose mongoose @nestjs/swagger swagger-ui-express @nestjs/jwt passport-jwt bcrypt
    
    ```
    
3. **Set up the database:**
    - Establish a connection with MongoDB using `MongooseModule`.
    - Create schemas for Users and Articles.
4. **Set up the authentication system:**
    - Use JWT for authentication.
    - Create necessary modules, services, and guards for authentication.
    - Implement login and sign-up endpoints.
5. **Create CRUD for Users and Articles:**
    - Create modules, controllers, and services for Users and Articles.
    - Implement CRUD operations (Create, Read, Update, Delete).
6. **Set up Swagger for documentation:**
    - Integrate Swagger to document all endpoints.

### Instructions:

- **Database Connection:**
Ensure the NestJS project is connected to MongoDB.
- **Create Modules and Schemas:**
    - Create schemas for User and Article.
    - Set up User and Article modules.
- **Implement Authentication System:**
    - Set up an authentication module using JWT.
    - Create guards to protect endpoints.
    - Implement `login` and `sign-up` endpoints.
- **Set up CRUD for Users and Articles:**
    - Implement endpoints for creating, reading, updating, and deleting users and articles.
- **Integrate Swagger:**
    - Add Swagger to document the API.
- User Schema:
    - firstName: string;
    - lastName: string;
    - email: string and unique;
    - password: string
    - createdAt: Date;
    - updatedAt: Date;
- Article Schema:
    - title: string;
    - content: string;
    - author: User;
    - createdAt: Date;
    - updatedAt: Date;

### Required Endpoints:

- **Authentication (Auth):**
    - `POST /auth/sign-up` - Sign up a new user.
    - `POST /auth/login` - Log in a user.
- **Users:**
    - `GET /users` - Get a list of users.
    - `GET /users/:id` - Get a user by ID.
    - `PUT /users/:id` - Update user information.
    - `DELETE /users/:id` - Delete a user.
- **Articles:**
    - `POST /articles` - Create a new article.
    - `GET /articles` - Get a list of articles.
    - `GET /articles/:id` - Get an article by ID.
    - `PUT /articles/:id` - Update an article.
    - `DELETE /articles/:id` - Delete an article.

### Notes:

- Use `bcrypt` to hash passwords.
- All endpoints should be documented with Swagger.

### Project Submission:

- Upload the code to a GitHub repository.
- Provide a README file with instructions on how to run the project locally.