const todoRouter = require("express").Router();
const controller = require("../controllers/todo.controller");
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

todoRouter.post("/add", controller.addTask);
todoRouter.post("/tasks", controller.getTasks)


module.exports = todoRouter;