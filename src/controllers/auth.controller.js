const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const { update, searchOne } = require("../core/repository");
const User = require("../models/UserModel");

exports.signup = async (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    //Check if the user is allready in the db
    const emailExists = await User.findOne({ email: req.body.email });
  
    if (emailExists) return res.status(400).send("Email allready exists");
  
    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
  
    //create new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });
  
    try {
      
      const userObj = await user.save();
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      userObj.accountActivationToken = token;
      await update(userObj, 'users')
      
      //res.header("auth-token", token).send(token);

      res.status(200).send({
        status: "ok",
        message: "Registration Successful",
        id: user._id
      });

      next();
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
};

exports.signin= async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    await User.findOne({ email: req.body.email })
    .then((user) => {
        bcrypt
        .compare(req.body.password, user.password)
            .then((passwordCheck) => {
                // check if password matches
                if(!passwordCheck) {
                    return res.status(400).send({
                    message: "Passwords does not match",
                    error,
                    });
                }

                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN });
                //res.header("auth-token", token).send(token);
                res.status(200).send({
                  status: "ok",
                  message: "Login Successful",
                  email: user.email,
                  accessToken: token,
                })
            })
            // catch error if password does not match
            .catch((error) => {
                res.status(400).send({
                message: "Passwords does not match",
                error,
                });
            });
    }).catch((error) => {
      res.status(400).send({
      message: "Email not found!",
      error,
      });
  });
};

exports.signout = async (req, res) => {
    try {
      req.session = null;
      res.redirect("/user/login");
    } catch (err) {
      this.next(err);
    }
};

exports.verifyTokenHandler = async (req, res) => {
  const { token } = req.body;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await searchOne({ _id: decoded.id }, 'users');
      if (user) {
        const tokenValid = token === user.passwordResetToken;
        if (tokenValid) {
          return res
            .status(200)
            .send({ status: "ok", message: "Token verified" });
        }
        return res
          .status(400)
          .send({ status: "error", message: "Token invalid" });
      }
    } catch (error) {
      return res.status(400).send({
        status: "error",
        message: "Invalid token",
      });
    }
  }
  return res.status(400).send({
    status: "error",
    message: "Invalid token",
  });
};

const forgotPasswordHandler = async (req, res) => {
  if (req.body.email) {
    const user = await searchOne({ email: req.body.email }, ModelName);
    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
          exp:
            Math.floor(Date.now() / 1000) +
            parseInt(process.env.JWT_EXPIRES_IN, 10),
        },
        process.env.JWT_SECRET
      );
      user.passwordResetToken = token;
      await update(user, ModelName);
      await sendPasswordResetEmail(
        req.body.email,
        "BizBook365 Password reset",
        token
      );
      return res
        .status(200)
        .send({ status: "ok", message: "Email sent successfully" });
    }
  }

  return res.status(400).send({
    status: "error",
    message: "Email address not found.",
  });
};

exports.resetPasswordHandler = async (req, res) => {
  const { token, password } = req.body;
  if (token && password) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await searchOne({ _id: ObjectId(decoded.id) }, ModelName);
      if (user) {
        const tokenValid = token === user.passwordResetToken;
        if (tokenValid) {
          await changePassword(user, password);
          return res
            .status(200)
            .send({ status: "ok", message: "Password changed successfully" });
        }
        return res
          .status(400)
          .send({ status: "error", message: "Token invalid" });
      }
    } catch (error) {
      return res.status(400).send({
        status: "error",
        message: "Invalid token",
      });
    }
  }
  return res.status(400).send({
    status: "error",
    message: "Invalid token",
  });
};

const registerSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(6).required(),
    submit: '',
});

const loginSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    submit: '',
});