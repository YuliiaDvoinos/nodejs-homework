const { user: service } = require("../../services");
const gravatar = require("gravatar");
const register = async (req, res, next) => {
  const { email, password } = req.body;
  const result = await service.findOne({ email });

  if (result) {
    res.status(409).json({
      status: "Conflict",
      code: 409,
      message: "Email in use",
    });
    return;
  }

  try {
    const avatarURL = gravatar.url(email);
    await service.addUser({ email, password, avatarURL });
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Reqistration success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
