const express = require("express");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const { authenticate } = require("../../middlewares");
const uploadMiddleware = require("../../middlewares/uploadMiddleware");
router.post("/signup", express.json(), ctrl.register);
router.post("/login", express.json(), ctrl.login);
router.get("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.getCurrent);
router.patch(
  "/avatars",
  authenticate,
  uploadMiddleware.single("avatar"),
  ctrl.updateAvatar
);
router.get("/verify/:verifyToken", ctrl.verifyEmail);
router.post("/verify", ctrl.resendEmail);
module.exports = router;
