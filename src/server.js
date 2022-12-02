
const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
require("./config/config");
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, './views'))
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
const AuthRoutes = require("./routes/AuthRoutes");

//route middlewares
app.use("/api/user", AuthRoutes);

app.get("/", (req, res, next) => {
    res.render('pages/index');
    next();
});

const server = http.createServer(app);
server.listen(port, () => console.log(`Running server on port: ${port}`));