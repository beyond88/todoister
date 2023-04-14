const dashboardRouter = require("express").Router();
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

dashboardRouter.get("/", auth, async (req, res) => {
    console.log(auth)
    const item = await getById(req.user._id, 'users');
    res.render('pages/dashboard', {item : item});
})

module.exports = dashboardRouter;