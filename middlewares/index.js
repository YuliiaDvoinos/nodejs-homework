const { authenticate } = require("./authenticate");
const uploadMiddleware = require("./uploadMiddleware");
module.exports = {
  authenticate,
  uploadMiddleware,
};
