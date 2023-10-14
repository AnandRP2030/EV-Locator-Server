const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const {userRouter} = require("./Router/user.router.js");
const {evRouter} = require("./Router/ev.router.js");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const MONGO_DB_URL = process.env.MONGO_DB_URL;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("check");
});

app.use("/user", userRouter);
app.use("/ev", evRouter);

mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("DB Connected.");
    app.listen(3000, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
