const { User } = require("../models");

const findOne = (filter) => {
  return User.findOne(filter);
};

const addUser = ({ email, password }) => {
  const newUser = new User({ email });
  newUser.setPassword(password);
  return newUser.save();
};
module.exports = {
  findOne,
  addUser,
};
