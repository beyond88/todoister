# Todoister

### _A complete (Work in progress now) to-do list maker repositoy with rich feature, following all production best practices._

This a very simple and classy to-do list maker to make your life well-planned. I will keep adding more features continuously.

![alt todoister](https://github.com/beyond88/todoister/blob/main/src/public/assets/img/todoister.png)

## Technology stack

As the name suggests, this repository is built on top of Express.js and React.js, however in the implementation detail, we will find other supporting technologies as well.

<strong>Client side</strong>

- jQuery - A JavaScript library for building user interfaces

<strong>Server side</strong>

- Node.js - evented I/O for the backend
- Express.js - Fast, unopinionated, minimalist web framework for Node.js
- MongoDB - The application data platform for NoSQL databases
- Mongoose - mongoose
- Swagger - Swagger (Not done yet)
- Jest - JavaScript testing framework
- Super Test - Super test API testing framework
  Details frameworks and packages can be found in the package.json files in server and client directory.

## Running the application

This project can be run basically in two ways. One is using docker, other way is to run manually via vscode.

## Visual Studio Code

<strong>Prerequisites</strong>

- Node.js : To run npm packages
- MongoDB : As a database for the application

**Steps**

- To run via vscode, we should run the server and client side projects separately, and also make sure mongodb is up and running.
- Create a .env file inside of the server directory. Add the below entries or change accordingly. You can follow the .env.sample file to see the format.

```
PORT="44444"
MONGODB_URL="mongodb://127.0.0.1:27017/todoister"

### FRONTEND URL ###
FRONTEND_URL=

JWT_SECRET="jwtsecret"
JWT_ACCESS_TOKEN_EXPIRES_IN="1d"
JWT_REFRESH_TOKEN_EXPIRES_IN="30d"
```

## License

This project is [MIT licensed](https://github.com/facebook/react/blob/main/LICENSE).

## Contribution

For now, I am not taking any community contritutions in terms of code. But if you have any suggestions or you found any bugs, please feel free to open an issue or a pull request.

On the other hand, if you want to know something, or want to start a discussion about this project, please start a discussion in our GitHub's discussion board.
