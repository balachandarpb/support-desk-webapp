const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");
// router.post("/", (req, res) => {
//   res.send("Register Users");
// });
// router.post("/login", (req, res) => {
//   res.send("Login Users");
// });

router.post("/users", registerUser);
router.post("/users/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
