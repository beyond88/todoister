const settingsdRouter = require("express").Router();

const {
    getByIdHandler,
    updateHandler,
    searchHandler: baseSearchHandler,
    countHandler: baseCountHandler,
    deleteHandler,
  } = require("../core/controller");

  const {
    getById,
    search,
    count,
    save,
    update,
    deleteById,
  } = require("../core/repository");

const auth = require("../middleware/auth");

settingsdRouter.get("/", auth, async (req, res) => {
    const item = await getById(req.user._id, 'users');
    res.render('pages/profile', {item: item});
})

settingsdRouter.get("/reset-password", auth, (req, res) => {
    res.render('pages/reset-password');
})

settingsdRouter.put("/update", (req, res, next) => {
    const item = updateHandler(req.body, res, next);
    return res.status(200).send({
        res: item
    });
})

module.exports = settingsdRouter;