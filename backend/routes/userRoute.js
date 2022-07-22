const express = require("express");
const router = express.Router();
const { addUser, getUser } = require("../controllers/userCrl");

router.route("/").post(addUser);
router.route("/").get(getUser);

module.exports = router;
