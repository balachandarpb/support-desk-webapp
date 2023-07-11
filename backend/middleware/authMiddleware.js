const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const asyncHolder = require("express-async-handler");

const protect = asyncHolder(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-pass");
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

module.exports = {
  protect,
};
