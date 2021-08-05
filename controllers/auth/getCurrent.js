const { user: service } = require("../../services");

const getCurrent = async (req, res, next) => {
  const { _id, email, subscription } = req.user;
  try {
    await service.getById(_id);
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
