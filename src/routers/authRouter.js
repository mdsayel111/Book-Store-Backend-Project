const { client } = require("../DB");
const jwt = require("jsonwebtoken");

const authRouter = require("express").Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      await client.query("INSERT INTO users(email, password) VALUES($1, $2)", [
        email,
        password,
      ]);
      return res.send({ message: "Signup successfull" });
    }
    res.status(401).send({ message: "unathorize" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "internal server error" });
  }
});

authRouter.post("/signin", async (req, res) => {
  try {
    console.log("signin");
    const { email, password } = req.body;
    if (email && password) {
      const result = await client.query(
        "SELECT email, password FROM users WHERE email = $1",
        [email]
      );
      const userInfoFromDB = result?.rows[0];
      if (
        email === userInfoFromDB.email &&
        password === userInfoFromDB.password
      ) {
        console.log(process.env.SECRET_KEY);
        const token = jwt.sign({ email }, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });
        return res
          .cookie("token", token)
          .send({ message: "Signin successfull" });
      }
    }
    res.status(401).send({ message: "unathorize" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "internal server error" });
  }
});

module.exports = authRouter;
