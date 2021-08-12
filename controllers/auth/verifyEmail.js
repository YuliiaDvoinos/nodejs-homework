const { user: service } = require("../../services");
const verifyEmail = async (req, res, next) => {
  const { verifyToken } = req.params;

  try {
    const user = await service.findOne({ verifyToken });
    console.log(user);
    if (!user) {
      return res.status(404).json({
        status: "Error",
        code: 404,
        message: "User not found",
      });
    }

    await service.updateById(user._id, {
      verify: true,
      verificationToken: null,
    });
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
