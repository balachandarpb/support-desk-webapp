const mongoose = require("mongoose");
const userScheme = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter the Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter the email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter the password"],
    },
    isAdmin: {
      type: String,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userScheme);
