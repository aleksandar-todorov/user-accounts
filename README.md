# User Accounts Web Application 

RESTful Application created with Spring Boot for backend and React.js for frontend.

## Prerequisites

```python
Java 11
Maven
PostgreSQL
Project Lombok
Javascript
React.js
Npm and Node.js
```

## Installation

1. Download the backend and the frontend folders
2. Go to backend-user-accounts-with-spring-and-react\src\main\resources folder, open application.properties file and change your postgre url, username and/or password.
3. Create user_accounts Database.
4. Install [project lombok plugin](https://projectlombok.org/) in your IDE and [Enabling Annotation Processing](https://www.baeldung.com/lombok-ide) if you use IntelliJ IDEA 
5. Run the Backend on port 8080. If you need to change this port you must replace the 8080 port in the frontend too. Open folder frontend-user-accounts-with-spring-and-react\src\service , open UserService.js and change LOCAL_HOST_USERS variable with the new port.
6. Install [npm and Node.js](https://www.npmjs.com/get-npm) if you don't already have them.
7. Open the frontend folder, open the terminal and run

```bash
npm install
```
8. run

```bash
npm start
```
9. The Frontend will run on http://localhost:3000/