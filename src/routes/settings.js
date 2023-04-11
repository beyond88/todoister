const settingsdRouter = require("express").Router();
const fileUpload = require('express-fileupload');

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

settingsdRouter.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

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

settingsdRouter.post("/avatar", (req, res, next) => {
    
    // Get the file that was set to our field named "image"
    const { image } = req.files;

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    if (/^image/.test(image.mimetype)) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/upload/' + image.name);

    // All good
    res.status(200).send({status:'okk', message: 'Uploaded'});
})

module.exports = settingsdRouter;