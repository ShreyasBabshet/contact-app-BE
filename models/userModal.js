const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter The Username"],
    },
    email: {
      type: String,
      required: [true, "Please Enter The Email"],
      unique: [true, "Email already registered"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
