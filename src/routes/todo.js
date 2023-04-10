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
todoRouter.post("/tasks", controller.getTasks);
todoRouter.post("/delete", controller.deleteTask);
todoRouter.post("/status", (req, res, next) => {
  const item = updateHandler(req.body, res, next);
  return res.status(200).send({
      status: "ok",
      message: "Updated"
  });
});


module.exports = todoRouter;