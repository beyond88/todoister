const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const { update, searchOne } = require("../core/repository");
const Tasks = require("../models/TaskModel");

exports.addTask = async (req, res, next) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //create new user
  const task = new Tasks({
    title: req.body.title,
    completed: req.body.completed,
    user_id: req.body.user_id,
    priority: req.body.priority,
  });

  try {
    
    const taskObj = await task.save();
    res.status(200).send({
      status: "ok",
      message: "Task added successfully",
    });

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getTasks = async (req, res, next) => {

  try {
    const tasks = await Tasks.find({ user_id: req.body.user_id })
    res.status(200).json({
      status: "ok",
      tasks: tasks
    });

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteTask = async (req, res, next) => {

  try {
    const tasks = await Tasks.deleteOne({ _id: req.body._id })
    res.status(200).json({
      status: "ok",
      message: "Task is deleted"
    });

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.markCompleted = async (req, res, next) => {

 try {
    const tasks = await Tasks.deleteOne({ _id: req.body._id })
    res.status(200).json({
      status: "ok",
      message: "Task is deleted"
    });

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  } 

}

const taskSchema = Joi.object({
    title: Joi.string().required(),
    completed: Joi.number().required(),
    user_id: Joi.string().required(),
    priority: Joi.number().required(),
});