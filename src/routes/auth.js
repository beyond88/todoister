const router = require("express").Router();
const controller = require("../controllers/auth.controller");

router.get("/login", (req, res) => {
    res.render('pages/login');
})
router.post("/login", controller.signin)

router.get("/register", (req, res) => {
    res.render('pages/register');
})
router.post("/register", controller.signup)

router.get("/logout", controller.signout)

// router.post("/forgot-password", controller.forgotPasswordHandler);
router.post("/verify-token", controller.verifyTokenHandler);
// router.post("/reset-password", controller.resetPasswordHandler);


module.exports = router;