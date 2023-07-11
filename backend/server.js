const express = require("express");

const dotenv = require("dotenv").config();
const connectDb = require("./config/db");
const colors = require("colors");

const { errHandler } = require("./middleware/errorMware");

const cors = require("cors");
const mongoose = require("mongoose");
PORT = process.env.PORT || 5000;
connectDb();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extends: false }));
app.use(cors());
app.get("/api/users", (req, res) => {
  res.json({ welcome: "hello Full Stack" });
});

app.use("/api", require("./router/userRoutes"));
app.use("/api/tickets", require("./router/ticketRoutes"));
app.use(errHandler);
app.listen(PORT, () => console.log(PORT));
