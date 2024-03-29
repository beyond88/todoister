const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, "Task is required!"]
  },

  completed: {
    type: Number,
    required: [true, ""],
  },

  user_id: {
    type: String,
    required: [true, ""],
  },

  priority: {
    type: Number,
    required: [false, ""],
  }

}, {
  timestamps: true
})

module.exports = mongoose.model("tasks", TaskSchema);