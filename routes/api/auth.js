const express = require("express");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");

router.post("/signup", express.json(), ctrl.register);
router.post("/login", express.json(), ctrl.login);
// router.post("./logout", express.json(), ctrl.logout);
//
module.exports = router;
