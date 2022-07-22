const jwt = require("jsonwebtoken");
const UnAuthenticatedError = require("../errors/UnAuthenticatedError");
const NotAllowedError = require("../errors/NotAllowedError");

const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  let payload = null;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new UnAuthenticatedError("Authentication invalid");
  }

  if (payload && (payload.type === "Admin" || payload.type === "Student")) {
    req.user = { userId: payload.userId, type: payload.type };
    next();
  } else {
    throw new NotAllowedError("You're unauthorized to access this route");
  }
};

module.exports = { authenticateAdmin };
