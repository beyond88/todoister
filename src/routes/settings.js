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
const multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './image')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
  })

const fs = require('fs');
const upload = multer({ storage: storage });

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

settingsdRouter.post('/upload', upload.single("avatar"), (req, res, next)=> {

  const body = {
    modelName: 'users',
    _id: req.body.user_id,
    avatar: req.file.filename
  }

  updateHandler(body, res, next);

});

module.exports = settingsdRouter;