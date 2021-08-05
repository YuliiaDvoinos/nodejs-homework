const { contact: service } = require("../../services");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

const listContacts = async (req, res, next) => {
  //auth
  // const { Authorization } = req.headers;
  //3d hw
  try {
    const result = await service.getAll();
    res.status(201).json({
      status: "success",
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
