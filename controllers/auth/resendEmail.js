const { user: service } = require("../../services");
const { sendMail } = require("../../configs/sendMail");

const resendEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: "Bad request",
      code: 400,
      message: "missing required field email",
    });
  }

  const user = await service.findOne({ email });
  console.log(user);
  try {
    if (user.verify) {
      return res.status(400).json({
        status: "Bad request",
        code: 400,
        message: "Verification has already been passed",
      });
    }

    const mail = {
      to: "jdvs@meta.ua",
      subject: "test verification",
      text: "Need to verify your email",
      html: `<a href="http://localhost:3000/api/auth/users/verify/${user.verifyToken}">
          Нажмите для подтверждения email
        </a>`,
    };

    await sendMail(mail);

    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendEmail;
