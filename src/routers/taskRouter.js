const { client } = require("../DB");
const { verifyUser } = require("../utils/auth");
const taskRouter = require("express").Router();

taskRouter.use(verifyUser);
taskRouter.post("/", async (req, res) => {
  const task = req.body
  client.query("INSERT INTO tasks()")
  res.send({ message: "Task added succesful" });
});

module.exports = taskRouter;
