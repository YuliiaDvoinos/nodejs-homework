const { user: service } = require("../../services");

const logout = async (req, res, next) => {
  try {
    await service.updateById(req.user._id, { token: null });
    res.status(200).json({
      status: "succsess",
      code: 200,
      message: "No content",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
