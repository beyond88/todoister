const settingsdRouter = require("express").Router();
const {
    getByIdHandler,
    updateHandler,
    searchHandler: baseSearchHandler,
    countHandler: baseCountHandler,
    deleteHandler,
  } = require("../core/controller");

const auth = require("../middleware/auth");

settingsdRouter.get("/", auth, (req, res) => {
    res.render('pages/profile');
})

settingsdRouter.get("/reset-password", auth, (req, res) => {
    console.log(auth)
    res.render('pages/reset-password');
})

module.exports = settingsdRouter;