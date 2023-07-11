const asyncHolder = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const registerUser = asyncHolder(async (req, res) => {
  const { name, email, password } = req.body;
  // if (!name || !email || !password) {
  //   res.status(400);
  //   throw new error("Please fill all the details");
  // }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      token: genToken(user._id),
    });
  } else {
    res.status(400);
    throw new error("Invalid user data");
  }
});

const loginUser = asyncHolder(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: genToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
const getMe = asyncHolder(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user);
  // const data = req.user;
  // console.log(data);
});
const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
