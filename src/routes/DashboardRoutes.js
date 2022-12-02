const dashboardRouter = require("express").Router();

dashboardRouter.get("/", (req, res) => {
    res.render('pages/dashboard');
})

module.exports = dashboardRouter;