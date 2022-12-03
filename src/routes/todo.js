const tododRouter = require("express").Router();

const auth = require("../middleware/auth");

tododRouter.get("/", auth, (req, res) => {
    console.log(auth)
    res.render('pages/todo');
})

module.exports = tododRouter;