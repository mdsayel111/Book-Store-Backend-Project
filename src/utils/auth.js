const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const { token } = req.cookies;
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (decoded.email) {
    next();
  }
  res.status(401).send({ message: "Unathorize" });
};

module.exports = { verifyUser };
