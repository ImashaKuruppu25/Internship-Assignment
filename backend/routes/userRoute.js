const express = require("express");
const router = express.Router();
const { addUser, getUser, getAllUsers } = require("../controllers/userCrl");

router.route("/").post(addUser);
router.route("/").get(getUser);
router.route("/getAll").get(getAllUsers);

module.exports = router;
