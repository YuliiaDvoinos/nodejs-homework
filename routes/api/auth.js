const express = require("express");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const { authenticate } = require("../../middlewares");
router.post("/signup", express.json(), ctrl.register);
router.post("/login", express.json(), ctrl.login);
router.get("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.getCurrent);
module.exports = router;
