const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.send("Access Denied!");
    }

    if (token.startsWith("BearerCtgu ")) {
      token = token.slice(11, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.CTGU_JWT_TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = verifyToken;
