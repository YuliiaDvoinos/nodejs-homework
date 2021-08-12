const { user: service } = require("../../services");
const gravatar = require("gravatar");
const shortid = require("shortid");
const { sendMail } = require("../../configs/sendMail");
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
    const verifyToken = shortid.generate();

    const avatarURL = gravatar.url(email);
    await service.addUser({ email, password, avatarURL, verifyToken });

    const mail = {
      to: "jdvs@meta.ua",
      subject: "test verification",
      text: "Need to verify your email",
      html: `<a href="http://localhost:3000/api/auth/users/verify/${verifyToken}">
          Нажмите для подтверждения email
        </a>`,
    };
    await sendMail(mail);

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Reqistration success, need to verify email",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
