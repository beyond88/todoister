const todoRouter = require("express").Router();
const {
    getByIdHandler,
    saveHandler,
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

todoRouter.get("/", auth, async (req, res) => {
  const item = await getById(req.user._id, 'users');
  res.render('pages/todo', {item: item});
})

todoRouter.post("/add", (req, res, next) => {
  const item = saveHandler(req.body, res, next);
  return res.status(200).send({
    res: item
  });
})

module.exports = todoRouter;