const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, "Name is required!"],
    min: 2,
    max: 255,
  },

  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
    min: 3,
    max: 255,
  },
    
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
    min: 6,
    max: 255,
  },
  passwordResetToken: { type: String, required: false },
  accountActivationToken: { type: String, required: false },

}, {
  timestamps: true
})

module.exports = mongoose.model.users || mongoose.model("users", UserSchema);
  