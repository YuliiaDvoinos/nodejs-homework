const { User } = require("../models");
const gravatar = require("gravatar");
const findOne = (filter) => {
  return User.findOne(filter);
};
const getById = (id) => User.findById(id);
const addUser = ({ email, password, avatarURL, verifyToken }) => {
  const newUser = new User({ email, avatarURL, verifyToken });

  newUser.setPassword(password);
  return newUser.save();
};
const updateById = (id, updInfo) => {
  return User.findByIdAndUpdate(id, updInfo);
};
module.exports = {
  findOne,
  addUser,
  getById,
  updateById,
};
