const { contact: service } = require("../../services");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body: fields } = req;
  try {
    const result = await service.updateContact(contactId, fields, {
      new: true,
    });
    if (!result) {
      res.json({
        status: "error",
        code: 400,
        message: 'missing field "favorite"',
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
