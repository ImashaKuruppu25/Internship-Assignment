const express = require("express");
const router = express.Router();
const { addUser } = require("../controllers/userCrl");

router.route("/").post(addUser);

module.exports = router;