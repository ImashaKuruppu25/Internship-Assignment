const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");

const addUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    type: user.type,
  });
};

module.exports = { addUser };
