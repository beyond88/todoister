
const express = require("express");
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require("./config/config");
const port = process.env.PORT || 3000; 

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, './views'));
app.use(express.static(__dirname + '/public'));
app.use(express.static('image'));
app.set('view engine', 'ejs');

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
const auth = require("./routes/auth");
const dashboard = require("./routes/dashboard");
const todo = require("./routes/todo");
const settings = require("./routes/settings");

//route middlewares
app.use("/user", auth);
app.use("/dashboard", dashboard);
app.use("/todo", todo);
app.use("/settings", settings);

app.get("/", (req, res, next) => {
    res.render('pages/index');
    next();
});

const server = http.createServer(app);
server.listen(port, () => {});