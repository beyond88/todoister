const settingsdRouter = require("express").Router();

const auth = require("../middleware/auth");

settingsdRouter.get("/", auth, (req, res) => {
    console.log(auth)
    res.render('pages/profile');
})

settingsdRouter.get("/reset-password", auth, (req, res) => {
    console.log(auth)
    res.render('pages/reset-password');
})

module.exports = settingsdRouter;