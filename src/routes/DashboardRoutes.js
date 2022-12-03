const dashboardRouter = require("express").Router();

const auth = require("../middleware/auth");

dashboardRouter.get("/", auth, (req, res) => {
    console.log(auth)
    res.render('pages/dashboard');
})

module.exports = dashboardRouter;