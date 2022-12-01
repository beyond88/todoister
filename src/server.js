
const express = require("express");
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
require("./config/config");
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

//import routes
const AuthRoutes = require("./routes/AuthRoutes");

//route middlewares
app.use("/api/user", AuthRoutes);

app.get("/", (request, response, next) => {
    response.json({ message: "Hola make some noise!" });
    next();
});

const server = http.createServer(app);
server.listen(port, () => console.log(`Running server on port: ${port}`));