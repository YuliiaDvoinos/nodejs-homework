const { contact: service } = require("../../services");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.getContactById(contactId);
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    res.status(201).json({
      status: "success",
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
