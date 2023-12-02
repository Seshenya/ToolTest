# NodeJS Backend

Exposing api endpoints for media application

## Getting Started - How to run NodeJS Backend locally

### Setup

1. Clone the repository

2. Install Dependencies

```command prompt
npm install
```

3. Configure database connection settings
   In the src/config file, change the host, port, username, password as per your local set up of mysql DB

4. Configure client url
   In the src/config file, add the url of the client application to the clientUrl array

5. Run the application (served on http://localhost:4000)

```command prompt
npm run start:dev
```

### Description

1. When the application is started, type-orm initilizes a connection with the mysql DB
2. All the entities added under entities array in connections/type-orm get initilized creating revelent tables in the DB
3. You can find the exposed endpoints in route file
