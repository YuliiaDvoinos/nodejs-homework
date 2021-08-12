const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const getCurrent = require("./getCurrent");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendEmail = require("./resendEmail");
module.exports = {
  login,
  logout,
  register,
  getCurrent,
  updateAvatar,
  verifyEmail,
  resendEmail,
};
