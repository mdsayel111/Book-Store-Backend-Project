const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./src/routers/authRouter");
const { client } = require("./src/DB");
const taskRouter = require("./src/routers/taskRouter");
const authRouter = require("./src/routers/authRouter");
const { redisClient } = require("./src/utils/redis");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  client.connect(function (err) {
    if (err) throw err;
    console.log("connect");
  });
  redisClient.connect();
});
