const { contact: service } = require("../../services");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body: fields } = req;
  try {
    const result = await service.updateContact(contactId, fields, {
      new: true,
    });
    res.status(201).json({
      status: "success",
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
