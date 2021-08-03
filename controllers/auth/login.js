const { user: service } = require("../../services");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await service.findOne({ email });

    if (!user || !user.comparePassword(password)) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Invalid email or password",
      });
      return;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = login;
