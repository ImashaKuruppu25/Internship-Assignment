const express = require("express");
const router = express.Router();
const {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
} = require("../controllers/userCrl");

router.route("/").post(addUser);
router.route("/").get(getUser);
router.route("/getAll").get(getAllUsers);
router.route("/updateUser/:id").patch(updateUser);

module.exports = router;
