const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please provide the ID"],
  },
  firstName: {
    type: String,
    // required: [true, "Please provide the first name"],
  },
  lastName: {
    type: String,
    // required: [true, "Please provide the last name"],
  },
  email: {
    type: String,
    required: [true, "Please provide the email address"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ,
      "Please provide a valid email address",
    ],
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    // required: [true, "Please provide the date of birth"],
  },
  mobile: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
  password: {
    type: String,
    required: [true, "Please provide the password"],
  },
  type: {
    type: String,
    enum: {
      values: ["Admin", "Student"],
      message: "Please provide a valid user type",
    },
    default: "Student",
  },
});

//password hashing using mongoose middleware
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
