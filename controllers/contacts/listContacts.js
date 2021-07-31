const { contact: service } = require("../../services");

const listContacts = async (req, res, next) => {
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
