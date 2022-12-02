const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const User = require("../models/UserModel");

exports.signup = async (req, res) => {
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
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (err) {
      res.status(500).send({ message: error.message });
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

                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                res.header("auth-token", token);
                //   return success res
                // res.status(200).send({
                //     message: "Login Successful",
                //     email: user.email,
                //     token,
                // });

                res.redirect("/dashboard");
                next();
            })
            // catch error if password does not match
            .catch((error) => {
                res.status(400).send({
                message: "Passwords does not match",
                error,
                });
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